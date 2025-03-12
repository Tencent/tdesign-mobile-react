import { StyledProps } from 'tdesign-mobile-react/common';
import forwardRefWithStatics from 'tdesign-mobile-react/_util/forwardRefWithStatics';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePrefixClass } from 'tdesign-mobile-react/hooks/useClass';
import parseTNode from 'tdesign-mobile-react/_util/parseTNode';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import classNames from 'classnames';
import { Property } from 'csstype';
import { useSwipe } from 'tdesign-mobile-react/_util/useSwipe';
import { SwiperChangeSource, SwiperNavigation, TdSwiperProps } from './type';
import { swiperDefaultProps } from './defaultProps';
import SwiperItem from './SwiperItem';
import SwiperContext, { SwiperItemReference } from './SwiperContext';

export interface SwiperProps extends TdSwiperProps, StyledProps {
  children?: React.ReactNode;
  touchable?: Boolean;
}

enum SwiperStatus {
  IDLE = 'idle', // 空闲状态
  SWITCHING = 'switching', // 切换状态
  STARTDRAG = 'startdrag', // 开始拖拽
  ENDDRAG = 'enddrag', // 结束拖拽
}

// swiper组件的动态style
interface SwiperStyleState {
  left?: string;
  right?: string;
  height?: string;
  transform?: string;
  transition?: string;
  flexDirection?: Property.FlexDirection;
}

const Swiper = forwardRefWithStatics(
  (originProps: SwiperProps) => {
    const props = useDefaultProps<SwiperProps>(originProps, swiperDefaultProps);
    const {
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
    } = props;

    const NONE_SUFFIX = '';
    const ACTIVE_SUFFIX = '--active';
    const PREV_SUFFIX = '--prev';
    const NEXT_SUFFIX = '--next';
    const SWIPE_THRESHOLD = 0.3; // 滑动阈值
    const currentIsNull = originProps.current === undefined;
    const swiperClass = usePrefixClass('swiper');
    const swiperNavClass = usePrefixClass('swiper-nav');
    const navCtrlActive = useRef(false); // 导航控制按钮激活状态
    const rootDiv = useRef<HTMLDivElement>(); // 根节点
    const swiperContainer = useRef<HTMLDivElement>(); // swiper容器节点
    const swiperSource = useRef<SwiperChangeSource>('autoplay'); // swiper变化来源
    const previousIndex = useRef(current || defaultCurrent || 0); // 上一次轮播页索引
    const nextIndex = useRef(previousIndex.current);
    const items = useRef<SwiperItemReference[]>([]); // swiper子项
    const [itemCount, setItemCount] = useState(0); // 轮播子项数量

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

    // 是否是导航配置
    const isSwiperNavigation = useMemo(() => {
      if (!navigation) return false;
      const { minShowNum, paginationPosition, placement, showControls, type } = navigation as any;
      return (
        minShowNum !== undefined ||
        paginationPosition !== undefined ||
        placement !== undefined ||
        showControls !== undefined ||
        type !== undefined
      );
    }, [navigation]);

    // 是否显示导航
    const enableNavigation = useMemo(() => {
      if (isSwiperNavigation) {
        const nav = navigation as SwiperNavigation;
        return nav?.minShowNum ? items.current.length > nav?.minShowNum : true;
      }
      return isObject(navigation);
    }, [isSwiperNavigation, navigation]);

    const isBottomPagination = useMemo(() => {
      if (!isSwiperNavigation || !enableNavigation) return false;
      const nav = navigation as SwiperNavigation;
      return (
        (!nav?.paginationPosition || nav?.paginationPosition === 'bottom') &&
        (nav?.type === 'dots' || nav?.type === 'dots-bar')
      );
    }, [enableNavigation, isSwiperNavigation, navigation]);

    // 导航位置
    const navPlacement = useMemo(() => {
      if (!isSwiperNavigation) return undefined;
      const nav = navigation as SwiperNavigation;
      return nav.placement;
    }, [isSwiperNavigation, navigation]);

    const rootClass = useMemo(
      () => [
        `${swiperClass}`,
        `${swiperClass}--${type}`,
        `${isBottomPagination && navPlacement ? `${swiperClass}--${navPlacement}` : ''}`,
      ],
      [swiperClass, type, isBottomPagination, navPlacement],
    );

    const intervalTimer = useRef<any>(); // 轮播计时器
    const durationTimer = useRef<any>(); // 轮播动画计时器
    const [itemChange, setItemChange] = useState(false); // 是否处于轮播状态
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

    const getRect = (element: HTMLDivElement) => {
      const width = element?.offsetWidth ?? 0;
      const height = element?.offsetHeight ?? 0;
      return { width, height };
    };

    const generateTransform = (axis: string, step: number) => `translate${axis}(${100 * step}%)`;

    const updateItemTranslateStyle = useCallback((itemRef: SwiperItemReference, axis: string, step: number) => {
      itemRef?.updateTranslateStyle(generateTransform(axis, step));
    }, []);

    const updateItemClassNameSuffix = useCallback((itemRef: SwiperItemReference, suffix: string) => {
      itemRef?.updateClassNameSuffix(suffix);
    }, []);

    const updateContainerTransfrom = (axis: string, step: number) => {
      setSwiperStyle((prevState) => ({
        ...prevState,
        transform: generateTransform(axis, step),
      }));
    };

    const forceContainerHeight = (height: number | string) => {
      setSwiperStyle((prevState) => ({
        ...prevState,
        height: isNumber(height) ? `${height}px` : height,
      }));
    };

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

    const checkSwipeItemInvisible = (activeIndex: number, axis: string, distance: number, loop: boolean) => {
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
    };

    const setContainerOffset = (activeIndex: number, loop: boolean, offset: { x: number; y: number }) => {
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
      updateContainerTransfrom(directionAxis, step);
    };

    const caculateItemIndex = useCallback((nextIndex: number, max: number, loop: boolean) => {
      let itemIndex = nextIndex;
      if (nextIndex < 0) {
        itemIndex = loop ? (nextIndex + max) % max : 0;
      } else if (nextIndex >= max) {
        itemIndex = loop ? (nextIndex - max) % max : max - 1;
      }
      return itemIndex;
    }, []);

    const caculateSwiperItemIndex = useCallback(
      (
        nextIndex: number,
        previousIndex: number,
        max: number,
        loop: boolean,
        outStep: number | undefined = undefined,
      ) => {
        const itemIndex = caculateItemIndex(nextIndex, max, loop);
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
      [caculateItemIndex],
    );

    // 进入idle状态
    const enterIdle = useCallback((axis: string) => {
      navCtrlActive.current = false;
      setSwiperStyle((prevState) => ({
        ...prevState,
        transition: 'none',
        transform: `translate${axis}(0)`,
      }));
      setSwiperStatus(SwiperStatus.IDLE);
    }, []);

    // 进入切换状态
    const enterSwitching = useCallback(
      (axis: string, outerStep: number | undefined = undefined) => {
        // 根据nextIndex计算需要定位到的
        const { index, step } = caculateSwiperItemIndex(
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
      [caculateSwiperItemIndex, duration, loop, updateSwiperItemClassName],
    );

    // 退出切换状态
    const quitSwitching = useCallback(
      (axis: string) => {
        previousIndex.current = caculateItemIndex(nextIndex.current, items.current.length, loop);
        updateSwiperItemPosition(axis, previousIndex.current, loop);
        enterIdle(axis);
        setItemChange((prevState) => !prevState);
      },
      [caculateItemIndex, enterIdle, loop, updateSwiperItemPosition],
    );

    // 上一页
    const goPrev = (source: SwiperChangeSource) => {
      navCtrlActive.current = true;
      swiperSource.current = source;
      nextIndex.current = previousIndex.current - 1;
      enterSwitching(directionAxis, -1);
    };

    // 下一页
    const goNext = (source: SwiperChangeSource) => {
      navCtrlActive.current = true;
      swiperSource.current = source;
      nextIndex.current = previousIndex.current + 1;
      enterSwitching(directionAxis, 1);
    };

    const onItemClick = () => {
      onClick?.(previousIndex.current ?? 0);
    };

    const { offset } = useSwipe(swiperContainer.current, {
      onSwipeStart: () => {
        if (navCtrlActive.current || !items.current.length) return;
        if (swiperStatus !== SwiperStatus.IDLE) return;
        setSwiperStatus(SwiperStatus.STARTDRAG);
        setSwiperStyle((prevState) => ({
          ...prevState,
          transition: `none`,
        }));
      },
      onSwipe: () => {
        if (navCtrlActive.current || !items.current.length) return;
        if (swiperStatus !== SwiperStatus.STARTDRAG) return;
        setContainerOffset(previousIndex.current, loop, offset());
      },
      onSwipeEnd: () => {
        if (navCtrlActive.current || !items.current.length) return;
        if (swiperStatus !== SwiperStatus.STARTDRAG) return;
        const { width, height } = getRect(rootDiv.current);
        if (!width || !height) return;
        const { x, y } = offset();
        const threshold = isVertical ? y / height : x / width;
        if (threshold > SWIPE_THRESHOLD) {
          goPrev('touch');
        } else if (threshold < -SWIPE_THRESHOLD) {
          goNext('touch');
        } else {
          enterSwitching(directionAxis, 0);
        }
      },
    });

    useEffect(() => {
      // 初始化卡片的位置
      previousIndex.current = caculateItemIndex(previousIndex.current, items.current.length, loop);
      updateSwiperItemClassName(previousIndex.current, loop);
      setDotIndex(() => previousIndex.current);
      updateSwiperItemPosition(directionAxis, previousIndex.current, loop);
    }, [caculateItemIndex, directionAxis, enterSwitching, loop, updateSwiperItemClassName, updateSwiperItemPosition]);

    useEffect(() => {
      if (currentIsNull) return;
      console.log(`[Swiper].current = ${current}, previousIndex = ${previousIndex.current}`);
      nextIndex.current = caculateItemIndex(current, items.current.length, loop);
      if (previousIndex.current !== nextIndex.current) {
        enterSwitching(directionAxis);
      }
    }, [caculateItemIndex, current, directionAxis, enterSwitching, loop, currentIsNull]);

    useEffect(() => {
      onChange?.(previousIndex.current, { source: swiperSource.current });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemChange]);

    useEffect(() => {
      if (props.height) {
        forceContainerHeight(props.height);
        return;
      }
      if (!items.current.length) return;
      const rect = items.current[0].divRef.current.getBoundingClientRect();
      if (rect) {
        forceContainerHeight(rect.height);
      }
    }, [props.height]);

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
          if (autoplay) {
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
        case SwiperStatus.ENDDRAG:
          setSwiperStatus(SwiperStatus.IDLE);
          break;
      }
    }, [autoplay, directionAxis, duration, enterIdle, enterSwitching, interval, quitSwitching, swiperStatus]);

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
          if (items.current.length > 0) {
            nextIndex.current = previousIndex.current + 1;
            setSwiperStatus(SwiperStatus.SWITCHING);
          }
        },
      }),
      [props.height],
    );

    const swiperNav = () => {
      // dots
      const dots = (navigation: SwiperNavigation) => {
        if (['dots', 'dots-bar'].includes(navigation?.type || '')) {
          return (
            <>
              {items.current.map((_: any, index: number) => (
                <span
                  key={`page${index}`}
                  className={classNames(
                    `${swiperNavClass}__${navigation?.type}-item`,
                    index === dotIndex ? `${swiperNavClass}__${navigation?.type}-item--active` : '',
                    `${swiperNavClass}__${navigation?.type}-item--${direction}`,
                  )}
                />
              ))}
            </>
          );
        }
      };

      // fraction
      const fraction = (navigation: SwiperNavigation) => {
        if (navigation?.type === 'fraction') {
          return <span>{`${(dotIndex ?? 0) + 1}/${items.current.length}`}</span>;
        }
      };

      const typeNav = (navigation: SwiperNavigation) => {
        if ('type' in navigation) {
          return (
            <span
              className={classNames(
                `${swiperNavClass}--${direction}`,
                `${swiperNavClass}__${navigation?.type || ''}`,
                `${swiperNavClass}--${navigation?.paginationPosition || 'bottom'}`,
                `${isBottomPagination && navigation?.placement ? `${swiperNavClass}--${navigation?.placement} ` : ''}`,
              )}
            >
              {dots(navigation)}
              {fraction(navigation)}
            </span>
          );
        }
      };

      const controlsNav = (navigation: SwiperNavigation) => {
        if (!isVertical && !!navigation?.showControls) {
          return (
            <span className={`${swiperNavClass}__btn`}>
              <span className={`${swiperNavClass}__btn--prev`} onClick={() => goPrev('nav')} />
              <span className={`${swiperNavClass}__btn--next`} onClick={() => goNext('nav')} />
            </span>
          );
        }
      };

      if (!enableNavigation) return '';
      if (isSwiperNavigation) {
        return (
          <>
            {controlsNav(navigation as SwiperNavigation)}
            {typeNav(navigation as SwiperNavigation)}
          </>
        );
      }
      return isObject(navigation) ? '' : parseTNode(navigation);
    };

    return (
      <div
        ref={rootDiv}
        className={classNames(rootClass)}
        style={{
          paddingTop: swiperStyle.height,
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
        {swiperNav()}
      </div>
    );
  },
  {
    SwiperItem,
  },
);

Swiper.displayName = 'Swiper';

export default Swiper;
