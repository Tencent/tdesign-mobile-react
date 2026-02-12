import React, { RefObject, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { isNumber } from 'lodash-es';
import classNames from 'classnames';
import { Property } from 'csstype';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import { useSwipe } from '../_util/useSwipe';
import parseTNode from '../_util/parseTNode';
import { StyledProps, TNode } from '../common';
import { SwiperChangeSource, SwiperNavigation, TdSwiperProps } from './type';
import { swiperDefaultProps } from './defaultProps';
import SwiperItem from './SwiperItem';
import SwiperContext, { SwiperItemReference } from './SwiperContext';

const DEFAULT_SWIPER_NAVIGATION: SwiperNavigation = {
  paginationPosition: 'bottom',
  placement: 'inside',
  showControls: false,
  type: 'dots',
};

// 常量提取到组件外部，避免每次渲染重新创建
const NONE_SUFFIX = '';
const ACTIVE_SUFFIX = '--active';
const PREV_SUFFIX = '--prev';
const NEXT_SUFFIX = '--next';
const SWIPE_THRESHOLD = 0.3; // 滑动阈值

// 纯函数提取到组件外部
const generateTransform = (axis: string, step: number) => `translate${axis}(${100 * step}%)`;

const getRect = (element: HTMLElement | null) => {
  const width = element?.offsetWidth ?? 0;
  const height = element?.offsetHeight ?? 0;
  return { width, height };
};

export interface SwiperProps extends TdSwiperProps, StyledProps {
  children?: React.ReactNode;
  touchable?: boolean;
  disabled?: boolean;
}

enum SwiperStatus {
  IDLE = 'idle', // 空闲状态
  SWITCHING = 'switching', // 切换状态
  STARTDRAG = 'startdrag', // 开始拖拽
}

interface SwiperStyleState {
  left?: string;
  right?: string;
  height?: string;
  transform?: string;
  transition?: string;
  flexDirection?: Property.FlexDirection;
}

const Swiper = forwardRefWithStatics(
  (originProps: SwiperProps, ref: React.Ref<HTMLDivElement>) => {
    const props = useDefaultProps<SwiperProps>(originProps, swiperDefaultProps);
    const {
      className,
      type,
      children,
      autoplay,
      current,
      defaultCurrent,
      direction,
      duration,
      interval,
      navigation,
      onChange,
      onClick,
      disabled,
    } = props;

    const currentIsNull = originProps.current === undefined;
    const swiperClass = usePrefixClass('swiper');
    const swiperNavClass = usePrefixClass('swiper-nav');
    const navCtrlActive = useRef(false); // 导航控制按钮激活状态
    const rootDiv = useRef<HTMLDivElement>(null); // 根节点
    const swiperContainer = useRef<HTMLDivElement>(null); // swiper容器节点
    const swiperSource = useRef<SwiperChangeSource>('autoplay'); // swiper变化来源
    const previousIndex = useRef(current ?? defaultCurrent ?? 0); // 上一次轮播页索引
    const nextIndex = useRef(previousIndex.current);
    const items = useRef<SwiperItemReference[]>([]); // swiper子项
    const [itemCount, setItemCount] = useState(0); // 轮播子项数量

    // 将内部 ref 暴露给外部
    useImperativeHandle(ref, () => rootDiv.current as HTMLDivElement);

    const isVertical = useMemo(() => direction === 'vertical', [direction]); // 轮播滑动方向(垂直)
    const directionAxis = useMemo(() => (isVertical ? 'Y' : 'X'), [isVertical]); // 轮播滑动方向轴

    // 是否支持轮播（card模式下，大于2张时才可正常轮播）
    const loop = useMemo(() => {
      if (!props.loop) return false;
      return type === 'card' ? itemCount > 2 : itemCount > 1;
    }, [type, props.loop, itemCount]);

    // 前边距
    const previousMargin = useMemo(
      () => (isNumber(props.previousMargin) ? `${props.previousMargin}px` : props.previousMargin),
      [props.previousMargin],
    );

    // 后边距
    const nextMargin = useMemo(
      () => (isNumber(props.nextMargin) ? `${props.nextMargin}px` : props.nextMargin),
      [props.nextMargin],
    );

    const navigationConfig = useMemo<SwiperNavigation>(() => {
      if (navigation === true) {
        return DEFAULT_SWIPER_NAVIGATION;
      }
      if (typeof navigation === 'object' && navigation !== null) {
        const navConfig = navigation as SwiperNavigation;
        return {
          paginationPosition: navConfig.paginationPosition ?? 'bottom',
          placement: navConfig.placement ?? 'inside',
          ...navConfig,
        } as SwiperNavigation;
      }
      return {} as SwiperNavigation;
    }, [navigation]);

    // 是否启用内置导航
    const enableBuiltinNavigation = useMemo(() => {
      // 如果配置为空（即 navigation 为 false 或 null），则不启用
      if (!Object.keys(navigationConfig).length) return false;

      const { minShowNum } = navigationConfig;
      return minShowNum ? itemCount >= minShowNum : true;
    }, [navigationConfig, itemCount]);

    const enableNavigation = useMemo(() => {
      // 只有显式 false 才禁用导航
      if (navigation === false) return false;
      return true;
    }, [navigation]);

    const isBottomPagination = useMemo(() => {
      if (!enableBuiltinNavigation || !enableNavigation) return false;
      return (
        (!navigationConfig?.paginationPosition || navigationConfig?.paginationPosition === 'bottom') &&
        (navigationConfig?.type === 'dots' || navigationConfig?.type === 'dots-bar')
      );
    }, [enableNavigation, enableBuiltinNavigation, navigationConfig]);

    // Vue 一致：只有 isBottomPagination 为 true 时才添加 placement class
    const rootClass = useMemo(
      () => [
        className,
        `${swiperClass}`,
        `${swiperClass}--${type}`,
        isBottomPagination && navigationConfig?.placement ? `${swiperClass}--${navigationConfig.placement}` : '',
      ],
      [swiperClass, type, isBottomPagination, navigationConfig, className],
    );

    const intervalTimer = useRef<ReturnType<typeof setTimeout> | null>(null); // 轮播计时器
    const durationTimer = useRef<ReturnType<typeof setTimeout> | null>(null); // 轮播动画计时器
    const [itemChange, setItemChange] = useState<boolean | null>(null); // 轮播状态变化标记，null 表示初始状态
    const [swiperStatus, setSwiperStatus] = useState(SwiperStatus.IDLE); // 轮播状态
    const [swiperStyle, setSwiperStyle] = useState<SwiperStyleState>({
      left: previousMargin,
      right: nextMargin,
      height: 'auto',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      transition: 'none',
      transform: '',
    });
    const [dotIndex, setDotIndex] = useState(previousIndex.current); // 当前索引

    const updateItemTranslateStyle = useCallback((itemRef: SwiperItemReference, axis: string, step: number) => {
      itemRef?.updateTranslateStyle(generateTransform(axis, step));
    }, []);

    const updateItemClassNameSuffix = useCallback((itemRef: SwiperItemReference, suffix: string) => {
      itemRef?.updateClassNameSuffix(suffix);
    }, []);

    const updateContainerTransform = useCallback((axis: string, step: number) => {
      setSwiperStyle((prevState) => ({
        ...prevState,
        transform: generateTransform(axis, step),
      }));
    }, []);

    const forceContainerHeight = useCallback((height: number | string) => {
      setSwiperStyle((prevState) => ({
        ...prevState,
        height: isNumber(height) ? `${height}px` : height,
      }));
    }, []);

    const updateSwiperItemPosition = useCallback(
      (axis: string, activeIndex: number, loop: boolean) => {
        if (items.current.length <= 1) return;
        const lastIndex = items.current.length - 1;
        items.current.forEach((item, index) => {
          let step = index - activeIndex;
          if (loop) {
            if (activeIndex === 0 && index === lastIndex) {
              step = -1;
            } else if (activeIndex === lastIndex && index === 0) {
              step = 1;
            }
          }
          updateItemTranslateStyle(item, axis, step);
        });
      },
      [updateItemTranslateStyle],
    );

    const updateSwiperItemClassName = useCallback(
      (activeIndex: number, loop: boolean) => {
        const lastIndex = items.current.length - 1;
        items.current.forEach((item, index) => {
          let step = index - activeIndex;
          if (loop) {
            if (activeIndex === 0 && index === lastIndex) {
              step = -1;
            } else if (activeIndex === lastIndex && index === 0) {
              step = 1;
            }
          }
          switch (step) {
            case -1:
              updateItemClassNameSuffix(item, PREV_SUFFIX);
              break;
            case 0:
              updateItemClassNameSuffix(item, ACTIVE_SUFFIX);
              break;
            case 1:
              updateItemClassNameSuffix(item, NEXT_SUFFIX);
              break;
            default:
              updateItemClassNameSuffix(item, NONE_SUFFIX);
              break;
          }
        });
      },
      [updateItemClassNameSuffix],
    );

    const checkSwipeItemInvisible = useCallback(
      (activeIndex: number, axis: string, distance: number, loop: boolean) => {
        const max = items.current.length;
        if (max <= 1 || distance === 0 || !loop) return;
        const prevIndex = (activeIndex + max - 1) % max;
        const nextIndex = (activeIndex + max + 1) % max;
        let step = 1;
        if (distance > 0) {
          const pItem = items.current[prevIndex];
          updateItemClassNameSuffix(pItem, PREV_SUFFIX);
          updateItemTranslateStyle(pItem, axis, -step);
          if (max > 2 && distance > 0.5) {
            step += 1;
            const ppItem = items.current[(prevIndex + max - 1) % max];
            updateItemClassNameSuffix(ppItem, PREV_SUFFIX);
            updateItemTranslateStyle(ppItem, axis, -step);
          }
          return;
        }

        const nItem = items.current[nextIndex];
        updateItemClassNameSuffix(nItem, NEXT_SUFFIX);
        updateItemTranslateStyle(nItem, axis, step);
        if (max > 2 && distance < -0.5) {
          step += 1;
          const nnItem = items.current[(nextIndex + max + 1) % max];
          updateItemClassNameSuffix(nnItem, NEXT_SUFFIX);
          updateItemTranslateStyle(nnItem, axis, step);
        }
      },
      [updateItemClassNameSuffix, updateItemTranslateStyle],
    );

    const setContainerOffset = useCallback(
      (activeIndex: number, loop: boolean, offset: { x: number; y: number }) => {
        const { x, y } = offset;
        const { width, height } = getRect(swiperContainer.current);
        let step = 0;
        if (!isVertical && width !== 0) {
          step = x / width;
        } else if (isVertical && height !== 0) {
          step = y / height;
        }

        checkSwipeItemInvisible(activeIndex, directionAxis, step, loop);
        step = step > 1 || step < -1 ? step / Math.abs(step) : step;
        updateContainerTransform(directionAxis, step);
      },
      [checkSwipeItemInvisible, directionAxis, isVertical, updateContainerTransform],
    );

    const calculateItemIndex = useCallback((nextIndex: number, max: number, loop: boolean) => {
      let itemIndex = nextIndex;
      if (nextIndex < 0) {
        itemIndex = loop ? (nextIndex + max) % max : 0;
      } else if (nextIndex >= max) {
        itemIndex = loop ? (nextIndex - max) % max : max - 1;
      }
      return itemIndex;
    }, []);

    const calculateSwiperItemIndex = useCallback(
      (
        nextIndex: number,
        previousIndex: number,
        max: number,
        loop: boolean,
        outStep: number | undefined = undefined,
      ) => {
        const itemIndex = calculateItemIndex(nextIndex, max, loop);
        if (itemIndex === previousIndex) {
          return { index: itemIndex, step: 0 };
        }

        let step = outStep;
        if (step === undefined && itemIndex !== previousIndex) {
          const distance = (itemIndex - previousIndex + max) % max;
          step = distance <= max / 2 ? distance : distance - max;
        }
        return { index: itemIndex, step };
      },
      [calculateItemIndex],
    );

    const enterIdle = useCallback((axis: string) => {
      navCtrlActive.current = false;
      setSwiperStyle((prevState) => ({
        ...prevState,
        transition: 'none',
        transform: `translate${axis}(0)`,
      }));
      setSwiperStatus(SwiperStatus.IDLE);
    }, []);

    const enterSwitching = useCallback(
      (axis: string, outerStep: number | undefined = undefined) => {
        // 根据nextIndex计算需要定位到的
        const { index, step } = calculateSwiperItemIndex(
          nextIndex.current,
          previousIndex.current,
          items.current.length,
          loop,
          outerStep,
        );
        updateSwiperItemClassName(index, loop);
        setDotIndex(() => index);
        setSwiperStyle((prevState) => ({
          ...prevState,
          transition: `transform ${duration}ms`,
          transform: generateTransform(axis, -step),
        }));
        setSwiperStatus(SwiperStatus.SWITCHING);
      },
      [calculateSwiperItemIndex, duration, loop, updateSwiperItemClassName],
    );

    const quitSwitching = useCallback(
      (axis: string) => {
        previousIndex.current = calculateItemIndex(nextIndex.current, items.current.length, loop);
        updateSwiperItemPosition(axis, previousIndex.current, loop);
        enterIdle(axis);
        setItemChange((prevState) => !prevState);
      },
      [calculateItemIndex, enterIdle, loop, updateSwiperItemPosition],
    );

    const goPrev = useCallback(
      (source: SwiperChangeSource) => {
        if (disabled) return;
        navCtrlActive.current = true;
        swiperSource.current = source;
        nextIndex.current = previousIndex.current - 1;
        enterSwitching(directionAxis, -1);
      },
      [disabled, directionAxis, enterSwitching],
    );

    const goNext = useCallback(
      (source: SwiperChangeSource) => {
        if (disabled) return;
        navCtrlActive.current = true;
        swiperSource.current = source;
        nextIndex.current = previousIndex.current + 1;
        enterSwitching(directionAxis, 1);
      },
      [disabled, directionAxis, enterSwitching],
    );

    const onItemClick = useCallback(() => {
      if (disabled) return;
      onClick?.(previousIndex.current ?? 0);
    }, [disabled, onClick]);

    const { offset } = useSwipe(swiperContainer.current, {
      disabled,
      onSwipeStart: () => {
        if (navCtrlActive.current || !items.current.length) return;
        if (swiperStatus !== SwiperStatus.IDLE) return;
        if (disabled) return;

        setSwiperStatus(SwiperStatus.STARTDRAG);
        setSwiperStyle((prevState) => ({
          ...prevState,
          transition: `none`,
        }));
      },
      onSwipe: () => {
        if (navCtrlActive.current || !items.current.length) return;
        if (swiperStatus !== SwiperStatus.STARTDRAG) return;
        if (disabled) return;
        setContainerOffset(previousIndex.current, loop, offset());
      },
      onSwipeEnd: () => {
        if (navCtrlActive.current || !items.current.length) return;
        if (swiperStatus !== SwiperStatus.STARTDRAG) return;
        if (disabled) return;
        const { width, height } = getRect(rootDiv.current);
        if (!width || !height) return;
        const { x, y } = offset();
        const threshold = isVertical ? y / height : x / width;
        if (threshold > SWIPE_THRESHOLD) {
          goPrev('touch');
        } else if (threshold < -SWIPE_THRESHOLD) {
          goNext('touch');
        } else {
          enterIdle(directionAxis);
        }
      },
    });

    useEffect(() => {
      // 初始化卡片的位置，items 为空时跳过
      if (!items.current.length) return;
      previousIndex.current = calculateItemIndex(previousIndex.current, items.current.length, loop);
      updateSwiperItemClassName(previousIndex.current, loop);
      setDotIndex(() => previousIndex.current);
      updateSwiperItemPosition(directionAxis, previousIndex.current, loop);
    }, [calculateItemIndex, directionAxis, loop, updateSwiperItemClassName, updateSwiperItemPosition, itemCount]);

    // 同步 margin 和 direction 变化到 swiperStyle
    useEffect(() => {
      setSwiperStyle((prevState) => ({
        ...prevState,
        left: previousMargin,
        right: nextMargin,
        flexDirection: direction === 'vertical' ? 'column' : 'row',
      }));
    }, [previousMargin, nextMargin, direction]);

    useEffect(() => {
      if (currentIsNull) return;
      nextIndex.current = calculateItemIndex(current, items.current.length, loop);
      if (previousIndex.current !== nextIndex.current) {
        enterSwitching(directionAxis);
      }
    }, [calculateItemIndex, current, directionAxis, enterSwitching, loop, currentIsNull]);

    useEffect(() => {
      // 跳过初始渲染，只在实际切换时触发 onChange
      if (itemChange === null) return;
      if (disabled) return;
      onChange?.(previousIndex.current, { source: swiperSource.current });
      // 退出切换状态
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemChange]);

    useEffect(() => {
      if (props.height) {
        forceContainerHeight(props.height);
        return;
      }
      if (!items.current.length) return;
      const rect = items.current[0].divRef.current?.getBoundingClientRect();
      if (rect) {
        forceContainerHeight(rect.height);
      }
    }, [props.height, forceContainerHeight, itemCount]);

    useEffect(() => {
      if (intervalTimer.current) {
        clearTimeout(intervalTimer.current);
        intervalTimer.current = null;
      }
      if (durationTimer.current) {
        clearTimeout(durationTimer.current);
        durationTimer.current = null;
      }
      switch (swiperStatus) {
        case SwiperStatus.IDLE:
          if (autoplay && !disabled) {
            nextIndex.current = previousIndex.current + 1;
            intervalTimer.current = setTimeout(() => {
              enterSwitching(directionAxis, 1);
            }, interval);
          }
          break;
        case SwiperStatus.SWITCHING:
          durationTimer.current = setTimeout(() => {
            quitSwitching(directionAxis);
          }, duration);
          break;
        case SwiperStatus.STARTDRAG:
          nextIndex.current = previousIndex.current;
          break;
      }

      // 清理函数：组件卸载或依赖变化时清除定时器
      return () => {
        if (intervalTimer.current) {
          clearTimeout(intervalTimer.current);
          intervalTimer.current = null;
        }
        if (durationTimer.current) {
          clearTimeout(durationTimer.current);
          durationTimer.current = null;
        }
      };
    }, [autoplay, directionAxis, duration, enterSwitching, interval, quitSwitching, swiperStatus, disabled]);

    const memoProviderValues = useMemo(
      () => ({
        forceContainerHeight: (height: number) => {
          if (!props.height) {
            forceContainerHeight(height);
          }
        },
        addChild: (ref: SwiperItemReference) => {
          items.current.push(ref);
          setItemCount(items.current.length);
        },
        removeChild: (divRef: RefObject<HTMLDivElement>) => {
          if (!divRef) return;
          const index = items.current.findIndex((item) => item.divRef === divRef);
          if (index === -1) return;
          items.current.splice(index, 1);
          setItemCount(items.current.length);
          if (props.disabled) return;
          if (items.current.length > 0) {
            nextIndex.current = previousIndex.current + 1;
            setSwiperStatus(SwiperStatus.SWITCHING);
          }
        },
      }),
      [props.height, props.disabled, forceContainerHeight],
    );

    const swiperNav = useMemo(() => {
      if (!enableNavigation) return null;

      if (enableBuiltinNavigation) {
        // dots 导航
        const dotsNav = ['dots', 'dots-bar'].includes(navigationConfig?.type || '') ? (
          <>
            {items.current.map((_, index) => (
              <span
                key={`page${index}`}
                className={classNames(
                  `${swiperNavClass}__${navigationConfig?.type}-item`,
                  index === dotIndex ? `${swiperNavClass}__${navigationConfig?.type}-item--active` : '',
                  `${swiperNavClass}__${navigationConfig?.type}-item--${direction}`,
                )}
              />
            ))}
          </>
        ) : null;

        // fraction 导航
        const fractionNav =
          navigationConfig?.type === 'fraction' ? (
            <span>{`${(dotIndex ?? 0) + 1}/${items.current.length}`}</span>
          ) : null;

        // type 导航容器
        const typeNav =
          'type' in navigationConfig ? (
            <span
              className={classNames(
                `${swiperNavClass}--${direction}`,
                `${swiperNavClass}__${navigationConfig?.type || ''}`,
                `${swiperNavClass}--${navigationConfig?.paginationPosition || 'bottom'}`,
                navigationConfig?.placement ? `${swiperNavClass}--${navigationConfig.placement}` : '',
              )}
            >
              {dotsNav}
              {fractionNav}
            </span>
          ) : null;

        // controls 导航
        const controlsNav =
          !isVertical && !!navigationConfig?.showControls ? (
            <span className={`${swiperNavClass}__btn`}>
              <span className={`${swiperNavClass}__btn--prev`} onClick={() => goPrev('nav')} />
              <span className={`${swiperNavClass}__btn--next`} onClick={() => goNext('nav')} />
            </span>
          ) : null;

        return (
          <>
            {controlsNav}
            {typeNav}
          </>
        );
      }

      // 如果 navigation 是对象类型（SwiperNavigation 配置），但由于 minShowNum 等条件不满足导航不显示，返回 null
      // 只有非对象类型（string/function/ReactElement）才作为自定义 TNode 导航处理
      if (typeof navigation === 'object' && navigation !== null) {
        return null;
      }

      // 自定义 TNode 导航 (string/function/ReactElement)
      return parseTNode(navigation as TNode);
      // 实际上我们需要它来触发导航器更新
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      enableNavigation,
      enableBuiltinNavigation,
      navigationConfig,
      swiperNavClass,
      dotIndex,
      direction,
      isBottomPagination,
      isVertical,
      goPrev,
      goNext,
      navigation,
      itemCount, // items.current.length 的响应式替代，用于触发导航器更新
    ]);

    return (
      <div
        ref={rootDiv}
        className={classNames(rootClass)}
        style={{
          height: swiperStyle.height,
          boxSizing: 'content-box',
        }}
      >
        <div
          ref={swiperContainer}
          className={classNames(`${swiperClass}__container--card`)}
          style={{
            left: swiperStyle.left,
            right: swiperStyle.right,
            flexDirection: swiperStyle.flexDirection,
            transition: swiperStyle.transition,
            transform: swiperStyle.transform,
            height: swiperStyle.height,
          }}
          onClick={onItemClick}
        >
          <SwiperContext.Provider value={memoProviderValues}>{parseTNode(children)}</SwiperContext.Provider>
        </div>
        {swiperNav}
      </div>
    );
  },
  {
    SwiperItem,
  },
);

Swiper.displayName = 'Swiper';

export default Swiper;
