import { StyledProps } from 'tdesign-mobile-react/common';
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import { usePrefixClass } from 'tdesign-mobile-react/hooks/useClass';
import { useSwipe } from 'tdesign-mobile-react/_util/useSwipe';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import classNames from 'classnames';
import parseTNode from 'tdesign-mobile-react/_util/parseTNode';
import forwardRefWithStatics from 'tdesign-mobile-react/_util/forwardRefWithStatics';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import { SwiperChangeSource, SwiperNavigation, TdSwiperProps } from './type';
import { swiperDefaultProps } from './defaultProps';
import SwiperContext from './SwiperContext';
import SwiperItem from './SwiperItem';

export interface SwiperProps extends TdSwiperProps, StyledProps {
  children?: React.ReactNode;
}

// 轮播状态
enum SwiperStatus {
  IDLE = 'idle', // 空闲状态
  SWITCHING = 'switching', // 切换状态
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

    const swiperClass = usePrefixClass('swiper');
    const swiperNavClass = usePrefixClass('swiper-nav');
    const navCtrlActive = useRef(false); // 导航控制按钮激活状态
    const rootDiv = useRef<HTMLDivElement>(); // 根节点
    const swiperContainer = useRef<HTMLDivElement>(); // swiper容器节点
    const swiperSource = useRef<SwiperChangeSource>('autoplay'); // swiper变化来源
    const currentIndex = useRef(defaultCurrent || current || 0); // 当前轮播页索引
    const previousIndex = useRef(currentIndex.current); // 上一次轮播页索引
    const items = useRef<
      {
        element: RefObject<HTMLDivElement>;
        updateTranslateStyle: (style: string) => void;
        updateClassNameSuffix: (extraClassName: string) => void;
      }[]
    >([]); // swiper子项

    const [containerAnimating, setContainerAnimating] = useState(false); // 是否处在轮播动画状态
    const [containerTransform, setContainerTransform] = useState(''); // 轮播容器transform样式
    const [containerHeight, setContainerHeight] = useState<number | string>('auto'); // 轮播容器高度
    const [, setCurrentIndex] = useDefault(current, defaultCurrent, (index) => {
      if (!items.current?.length) return;
      currentIndex.current = index;
    });

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

    const swiperStatus = useRef(SwiperStatus.IDLE); // 轮播状态
    const frameId = useRef(0); // 轮播帧id
    const lastTick = useRef(0); // 上一帧记录的时间戳
    const swiperStartTick = useRef(0); // 轮播开始时间戳
    const [tempStopAutoPlay, setTempStopAutoPlay] = useState(false); // 临时停止自动播放
    const tempStopAutoPlayRef = useRef(tempStopAutoPlay); // 临时停止自动播放引用
    const locateSwiperTimer = useRef<any>();

    const updateContainerTransfrom = (axis: string, step: number) => {
      setContainerTransform(() => `translate${axis}(${100 * step}%)`);
    };

    const forceContainerHeight = (height: number | string) => {
      setContainerHeight(() => (isNumber(height) ? `${height}px` : height));
    };

    const setContainerOffset = (offset: { x: number; y: number }) => {
      const { x, y } = offset;
      const width = rootDiv.current?.offsetWidth ?? 0;
      const height = rootDiv.current?.offsetHeight ?? 0;
      let step = 0;
      if (!isVertical && width !== 0) {
        step = x / width;
      } else if (isVertical && height !== 0) {
        step = y / height;
      }

      step = step > 1 || step < -1 ? step / Math.abs(step) : step;
      updateContainerTransfrom(directionAxis, step);
    };

    const caculateSwiperItemIndex = (index: number) => {
      let step = 0;
      let itemIndex = index;
      const max = items.current.length;

      if (index < 0) {
        itemIndex = loop ? (index + max) % max : 0;
      } else if (index >= max) {
        itemIndex = loop ? (index - max) % max : max - 1;
      }

      if (itemIndex !== currentIndex.current) {
        const distance = (itemIndex - currentIndex.current + max) % max;
        step = distance <= max / 2 ? distance : distance - max;
      }
      return { index: itemIndex, step };
    };

    const updateSwiperItemPosition = (axis: string) => {
      if (items.current.length <= 1) return;
      const lastItemIndex = items.current.length - 1;
      const activeIndex = currentIndex.current;
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

    const locateSwiperItemEnd = () => {
      navCtrlActive.current = false;
      setTempStopAutoPlay(() => false);
      setContainerAnimating(() => false);
      updateContainerTransfrom(directionAxis, 0);
      updateSwiperItemPosition(directionAxis);
      onChange?.(currentIndex.current, { source: swiperSource.current });
    };

    const addLocateSwiperTimer = () => {
      locateSwiperTimer.current = setTimeout(() => {
        locateSwiperItemEnd();
        locateSwiperTimer.current = null;
      }, duration);
    };

    const removeLocateSwiperTimer = () => {
      if (!locateSwiperTimer.current) return;
      locateSwiperItemEnd();
      clearTimeout(locateSwiperTimer.current);
      locateSwiperTimer.current = null;
    };

    const locateSwiperItem = (locateIndex: number, source: SwiperChangeSource) => {
      removeLocateSwiperTimer();
      swiperSource.current = source;
      const { index, step } = caculateSwiperItemIndex(locateIndex);
      console.log(
        `[Swiper].locateSwiperItem, currentIndex=${currentIndex.current}, nextIndex = ${index}, step = ${step}`,
      );
      previousIndex.current = index;
      setCurrentIndex(index);
      setContainerAnimating(() => true);
      updateContainerTransfrom(directionAxis, -step);
      updateSwiperItemClassName(index);
      addLocateSwiperTimer();
    };

    const goPrev = (source: SwiperChangeSource) => {
      navCtrlActive.current = true;
      setTempStopAutoPlay(() => true);
      locateSwiperItem(currentIndex.current - 1, source);
    };

    const goNext = (source: SwiperChangeSource) => {
      navCtrlActive.current = true;
      setTempStopAutoPlay(() => true);
      locateSwiperItem(currentIndex.current + 1, source);
    };

    const onItemClick = () => {
      onClick?.(currentIndex.current ?? 0);
    };

    const changeSwiperStatus = (nextStatus: SwiperStatus) => {
      if (swiperStatus.current === SwiperStatus.IDLE && nextStatus === SwiperStatus.SWITCHING) {
        locateSwiperItem(currentIndex.current + 1, 'autoplay');
      }
      swiperStatus.current = nextStatus;
    };

    const onUpdate = (timestamp: number) => {
      if (tempStopAutoPlayRef.current) return;

      lastTick.current = lastTick.current || timestamp;
      swiperStartTick.current = swiperStartTick.current || timestamp;

      if (lastTick.current - swiperStartTick.current >= interval) {
        changeSwiperStatus(SwiperStatus.SWITCHING);
        if (lastTick.current - swiperStartTick.current >= interval + duration) {
          changeSwiperStatus(SwiperStatus.IDLE);
          swiperStartTick.current = timestamp;
        }
      }

      lastTick.current = timestamp;

      if (autoplay) {
        frameId.current = window.requestAnimationFrame(onUpdate);
      }
    };

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
            locateSwiperItem(currentIndex.current + 1, 'autoplay');
          }
        },
      }),
      [],
    );

    const { offset } = useSwipe(swiperContainer.current, {
      onSwipeStart: () => {
        if (navCtrlActive.current || !items.current.length) return;
        setTempStopAutoPlay(() => true);
        setContainerAnimating(() => false);
      },

      onSwipe: () => {
        if (navCtrlActive.current || !items.current.length) return;
        setContainerOffset(offset());
      },

      onSwipeEnd: () => {
        if (navCtrlActive.current || !items.current.length) return;
        const { x, y } = offset();
        if ((!isVertical && x < -100) || (isVertical && y < -100)) {
          locateSwiperItem(currentIndex.current + 1, 'touch');
        } else if ((!isVertical && x > 100) || (isVertical && y > 100)) {
          locateSwiperItem(currentIndex.current - 1, 'touch');
        } else {
          console.log('[Swiper] onSwipeEnd, currentIndex = ', currentIndex.current);
          locateSwiperItem(currentIndex.current, 'touch');
        }
      },
    });

    useEffect(() => {
      if (current === previousIndex.current) return;
      locateSwiperItem(current, swiperSource.current);
    }, [current, previousIndex]);

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
      lastTick.current = 0;
      swiperStartTick.current = 0;
      tempStopAutoPlayRef.current = tempStopAutoPlay;
      if (frameId.current !== 0) {
        window.cancelAnimationFrame(frameId.current);
        frameId.current = 0;
      }
      if (!tempStopAutoPlay && autoplay) {
        frameId.current = window.requestAnimationFrame(onUpdate);
      }
    }, [autoplay, interval, duration, tempStopAutoPlay]);

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
                  index === currentIndex.current ? `${swiperNavClass}__${navigation?.type}-item--active` : '',
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
        return <span>{`${(currentIndex.current ?? 0) + 1}/${items.current.length}`}</span>;
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

    const swiperNav = () => {
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
          paddingTop: containerHeight,
        }}
      >
        <div
          ref={swiperContainer}
          className={classNames(`${swiperClass}__container--card`)}
          style={{
            left: previousMargin,
            right: nextMargin,
            flexDirection: !isVertical ? 'row' : 'column',
            transition: containerAnimating ? `transform ${duration}ms` : 'none',
            transform: containerTransform,
            height: containerHeight,
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
