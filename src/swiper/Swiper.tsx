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
import SwiperContext from './SwiperContext';

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
      loop,
      navigation,
      onChange,
      onClick,
    } = props;

    const SWIPE_THRESHOLD = 0.3; // 滑动阈值
    const swiperClass = usePrefixClass('swiper');
    const swiperNavClass = usePrefixClass('swiper-nav');
    const navCtrlActive = useRef(false); // 导航控制按钮激活状态
    const rootDiv = useRef<HTMLDivElement>(); // 根节点
    const swiperContainer = useRef<HTMLDivElement>(); // swiper容器节点
    const swiperSource = useRef<SwiperChangeSource>('autoplay'); // swiper变化来源
    const previousIndex = useRef(defaultCurrent || current || 0); // 上一次轮播页索引
    const nextIndex = useRef(previousIndex.current);
    const items = useRef<
      {
        element: RefObject<HTMLDivElement>;
        updateTranslateStyle: (style: string) => void;
        updateClassNameSuffix: (extraClassName: string) => void;
      }[]
    >([]); // swiper子项

    const isVertical = useMemo(() => direction === 'vertical', [direction]); // 轮播滑动方向(垂直)
    const directionAxis = useMemo(() => (isVertical ? 'Y' : 'X'), [isVertical]); // 轮播滑动方向轴
    const previousMargin = useMemo(
      () => (isNumber(props.previousMargin) ? `${props.previousMargin}px` : props.previousMargin),
      [props.previousMargin],
    );

    const nextMargin = useMemo(
      () => (isNumber(props.nextMargin) ? `${props.nextMargin}px` : props.nextMargin),
      [props.nextMargin],
    );

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

    const intervalTimer = useRef<any>();
    const durationTimer = useRef<any>();
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
    const [dotIndex, setDotIndex] = useState(previousIndex.current);

    const updateContainerTransfrom = (axis: string, step: number) => {
      setSwiperStyle((prevState) => ({
        ...prevState,
        transform: `translate${axis}(${100 * step}%)`,
      }));
    };

    const forceContainerHeight = (height: number | string) => {
      setSwiperStyle((prevState) => ({
        ...prevState,
        height: isNumber(height) ? `${height}px` : height,
      }));
    };

    const updateSwiperItemPosition = (axis: string, activeIndex: number) => {
      if (items.current.length <= 1) return;
      const lastItemIndex = items.current.length - 1;
      items.current.forEach((item, index) => {
        let step = index - activeIndex;
        if (activeIndex === lastItemIndex && index === 0) {
          // lastItem
          step = 1;
        } else if (activeIndex === 0 && index === lastItemIndex && index !== 1) {
          // firstItem
          step = -1;
        }
        item.updateTranslateStyle(`translate${axis}(${step * 100}%)`);
      });
    };

    const updateSwiperItemClassName = (activeIndex: number) => {
      const lastItemIndex = items.current.length - 1;
      items.current.forEach((item, index) => {
        let step = index - activeIndex;
        if (activeIndex === lastItemIndex && index === 0) {
          // lastItem
          step = 1;
        } else if (activeIndex === 0 && index === lastItemIndex && index !== 1) {
          // firstItem
          step = -1;
        }
        switch (step) {
          case -1:
            item.updateClassNameSuffix(`--prev`);
            break;
          case 0:
            item.updateClassNameSuffix(`--active`);
            break;
          case 1:
            item.updateClassNameSuffix(`--next`);
            break;
          default:
            item.updateClassNameSuffix('');
            break;
        }
      });
    };

    const getRect = (element: HTMLDivElement) => {
      const width = element?.offsetWidth ?? 0;
      const height = element?.offsetHeight ?? 0;
      return { width, height };
    };

    const setContainerOffset = (offset: { x: number; y: number }) => {
      const { x, y } = offset;
      const { width, height } = getRect(swiperContainer.current);
      let step = 0;
      if (!isVertical && width !== 0) {
        step = x / width;
      } else if (isVertical && height !== 0) {
        step = y / height;
      }

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
      (nextIndex: number, previousIndex: number, max: number, loop: boolean) => {
        let step = 0;
        const itemIndex = caculateItemIndex(nextIndex, max, loop);
        if (itemIndex !== previousIndex) {
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
      (axis: string) => {
        // 根据nextIndex计算需要定位到的
        const { index, step } = caculateSwiperItemIndex(
          nextIndex.current,
          previousIndex.current,
          items.current.length,
          loop,
        );
        updateSwiperItemClassName(index);
        setDotIndex(() => index);
        setSwiperStyle((prevState) => ({
          ...prevState,
          transition: `transform ${duration}ms`,
          transform: `translate${axis}(${-step * 100}%)`,
        }));
        setSwiperStatus(SwiperStatus.SWITCHING);
      },
      [caculateSwiperItemIndex, duration, loop],
    );

    // 退出切换状态
    const quitSwitching = useCallback(
      (axis: string) => {
        previousIndex.current = caculateItemIndex(nextIndex.current, items.current.length, loop);
        updateSwiperItemPosition(axis, previousIndex.current);
        enterIdle(axis);
        setItemChange((prevState) => !prevState);
      },
      [caculateItemIndex, enterIdle, loop],
    );

    // 上一页
    const goPrev = (source: SwiperChangeSource) => {
      navCtrlActive.current = true;
      swiperSource.current = source;
      nextIndex.current = previousIndex.current - 1;
      enterSwitching(directionAxis);
    };

    // 下一页
    const goNext = (source: SwiperChangeSource) => {
      navCtrlActive.current = true;
      swiperSource.current = source;
      nextIndex.current = previousIndex.current + 1;
      enterSwitching(directionAxis);
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
        setContainerOffset(offset());
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
          enterSwitching(directionAxis);
        }
      },
    });

    useEffect(() => {
      previousIndex.current = caculateItemIndex(previousIndex.current, items.current.length, loop);
      updateSwiperItemPosition(directionAxis, previousIndex.current);
      setDotIndex(previousIndex.current);
    }, [caculateItemIndex, directionAxis, loop]);

    useEffect(() => {
      console.log(`[Swiper].current = ${current}, previousIndex = ${previousIndex.current}`);
      nextIndex.current = caculateItemIndex(current, items.current.length, loop);
      if (previousIndex.current !== nextIndex.current) {
        enterSwitching(directionAxis);
      }
    }, [caculateItemIndex, current, directionAxis, enterSwitching, loop]);

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
      const rect = items.current[0].element.current.getBoundingClientRect();
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
              enterSwitching(directionAxis);
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
        addChild: (
          element: RefObject<HTMLDivElement>,
          updateTranslateStyle: (style: string) => void,
          updateClassNameSuffix: (classNameSuffix: string) => void,
        ) => {
          items.current.push({ element, updateTranslateStyle, updateClassNameSuffix });
        },
        removeChild: (element: RefObject<HTMLDivElement>) => {
          if (!element) return;
          const index = items.current.findIndex((item) => item.element === element);
          if (index === -1) return;
          items.current.splice(index, 1);
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
