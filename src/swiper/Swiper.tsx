import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import { TdSwiperProps, SwiperChangeSource } from './type';
import { StyledProps } from '../common';
import noop from '../_util/noop';
import useConfig from '../_util/useConfig';
import SwiperItem from './SwiperItem';

export interface SwiperProps extends TdSwiperProps, StyledProps {
  children?: React.ReactNode;
}

const Swiper: React.FC<SwiperProps> = (props) => {
  const {
    // animation = 'slide', // 轮播切换动画效果类型（暂时没用）
    autoplay = true, // 是否自动播放
    current, // 当前轮播在哪一项（下标）
    defaultCurrent = 0, // 当前轮播在哪一项（下标），非受控属性
    direction = 'horizontal', // 轮播滑动方向，包括横向滑动和纵向滑动两个方向
    duration = 300, // 滑动动画时长
    height = 180,
    interval = 5000, // 轮播间隔时间
    onChange = noop, // 轮播切换时触发
    loop = true,
    navigation = null, // 导航器全部配置
    className,
    style,
    children,
  } = props;

  const { classPrefix } = useConfig();
  const swiperBaseClassName = `${classPrefix}-swiper`;
  const switchClassName = classNames(swiperBaseClassName, className);

  const [currentIndex, setCurrentIndex] = useState(defaultCurrent + 1);
  const [moveStartSite, setMoveStartSite] = useState<null | number>(null); // 滑动state
  const [touchMoveDistance, setTouchMoveDistance] = useState(0);
  const [swiperOuterWidth, setSwiperOuterWidth] = useState(0); // swiper外层宽度
  const [containerWidth, setContainerWidth] = useState(0);
  const [animation, setAnimation] = useState(true);
  const swiperTimer = useRef(null); // 计时器指针
  const isHovering = useRef(false);
  const swiper = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiper) {
      setContainerWidth(swiper.current.clientWidth);
      if (direction === 'vertical') {
        setSwiperOuterWidth(swiper.current.clientHeight);
      } else {
        setSwiperOuterWidth(swiper.current.clientWidth);
      }
    }
  }, [direction]);

  // 用于控制 wrap 位移
  const wrapDisplacement = useMemo(() => `-${currentIndex * 100 - (touchMoveDistance / swiperOuterWidth) * 100}%`, [
    currentIndex,
    touchMoveDistance,
    swiperOuterWidth,
  ]);

  /** ************************************************************
   * 获取children，并创建子节点
   */
  // 过滤SwiperItem的子元素
  const childrenList = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child: JSX.Element) => child.type.displayName === SwiperItem.displayName,
      ),
    [children],
  );

  const childrenLength = childrenList.length;

  //   // 创建渲染用的节点列表
  const swiperItemList = childrenList.map((child: JSX.Element, index: number) =>
    React.cloneElement(child, {
      value: index,
      style: { height: `${height}px`, width: `${containerWidth}px` },
      className: `${classPrefix}-swiper__item`,
      ...child.props,
    }),
  );

  // 子节点不为空时，复制第一个子节点到列表最后，复制最后一个节点到列表最前（为了滑动创建的占位元素）
  if (childrenLength > 0) {
    const firstEle = swiperItemList[0];
    const lastEle = swiperItemList[childrenLength - 1];
    swiperItemList.push(React.cloneElement(firstEle, { ...firstEle.props, key: `${firstEle.key}-cloned` }));
    swiperItemList.unshift(React.cloneElement(lastEle, { ...lastEle.props, key: `${lastEle.key}-cloned` }));
  }

  const swiperItemLength = swiperItemList.length;

  /** ************************************************************
   * 处理默认跳转 及 动画逻辑
   */
  // 统一跳转处理函数
  const swiperTo = useCallback(
    (index: number, context: { source: SwiperChangeSource }) => {
      // 若禁止循环播放
      if (!loop) {
        if (index === childrenLength + 1) {
          setAnimation(true);
          setCurrentIndex(1);
          onChange(0, context);
          return;
        }
      }
      // 事件通知
      if (index === childrenLength + 1) {
        onChange(0, context);
      } else if (index === 0) {
        onChange(childrenLength - 1, context);
      } else {
        onChange((index % (childrenLength + 1)) - 1, context);
      }

      // 设置内部 index
      setAnimation(true);
      setCurrentIndex(index);
    },
    [childrenLength, onChange, loop],
  );

  // 定时器
  const setTimer = useCallback(() => {
    if (autoplay && interval > 0) {
      swiperTimer.current = setTimeout(
        () => {
          swiperTo(currentIndex + 1, { source: 'autoplay' });
        },
        currentIndex === 1 ? interval - (duration + 50) : interval, // 当 index 为 1 的时候，表明刚从克隆的最后一项跳转过来，已经经历了duration + 50 的间隔时间，减去即可
      );
    }
  }, [autoplay, currentIndex, duration, interval, swiperTo]);

  const clearTimer = useCallback(() => {
    if (swiperTimer.current) {
      clearTimeout(swiperTimer.current);
      swiperTimer.current = null;
    }
  }, []);

  // 监听 current 参数变化
  useEffect(() => {
    if (current && (current < 0 || current >= childrenLength)) return;
    if (current !== undefined) {
      swiperTo(current + 1, { source: '' });
    }
  }, [current, childrenLength, swiperTo]);

  // 在非鼠标 hover 状态时，添加切换下一个组件的定时器
  useEffect(() => {
    // 设置自动播放的定时器
    if (!isHovering.current) {
      clearTimer();
      setTimer();
    }
  }, [clearTimer, setTimer]);

  // 动画完成后取消 css 属性
  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
      // 如果当前在最后一个（占位）元素，则立刻跳转至第2个（第一个真实）元素
      if (currentIndex + 1 >= swiperItemLength) {
        setCurrentIndex(1);
      }
      // 如果当前在第一个（占位）元素，则立刻跳到最后一个（倒数第二个真实）元素
      if (currentIndex === 0) {
        setCurrentIndex(swiperItemLength - 2);
      }
    }, duration + 50); // 多 50ms 的间隔时间防止动画未执行完就跳转了
  }, [currentIndex, swiperItemLength, duration, direction]);

  /** ******************************************************************
   * 触摸事件处理方法
   */
  // 触摸滑动事件 - 开始
  const handleTouchStart = (e: TouchEvent) => {
    e.stopPropagation();
    isHovering.current = true;
    clearTimer();
    if (direction === 'vertical') {
      setMoveStartSite(e.touches[0].clientY);
    } else {
      setMoveStartSite(e.touches[0].clientX);
    }
  };

  // 触摸滑动事件 - 滑动中
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.stopPropagation();

      if (moveStartSite) {
        if (direction === 'vertical') {
          const nowDistence = e.touches[0].clientY - moveStartSite;
          if (
            !loop &&
            ((currentIndex === 1 && nowDistence > 0) || (currentIndex === childrenLength && nowDistence < 0))
          ) {
            return;
          }
          setTouchMoveDistance(nowDistence);
        } else {
          const nowDistence = e.touches[0].clientX - moveStartSite;
          if (
            !loop &&
            ((currentIndex === 1 && nowDistence > 0) || (currentIndex === childrenLength && nowDistence < 0))
          ) {
            return;
          }
          setTouchMoveDistance(nowDistence);
        }
      }
    },
    [setTouchMoveDistance, moveStartSite, direction, currentIndex, loop, childrenLength],
  );

  // 触摸滑动事件 - 结束
  const handleTouchEnd = (e: TouchEvent) => {
    e.stopPropagation();
    if (touchMoveDistance / swiperOuterWidth <= -0.3) {
      // swiperTo(currentIndex + 1, { source: 'touch' });
      // 这里不用 swiperTo 是防止滑动距离不够返回当前页动画会失效
      setCurrentIndex(currentIndex + 1);
      onChange(currentIndex === childrenLength ? 0 : currentIndex, { source: 'touch' });
    }

    if (touchMoveDistance / swiperOuterWidth >= 0.3) {
      // swiperTo(currentIndex - 1, { source: 'touch' });
      setCurrentIndex(currentIndex - 1);
      onChange(currentIndex - 1 === 0 ? 2 : currentIndex - 2, { source: 'touch' });
    }
    setAnimation(true);
    setTouchMoveDistance(0);
    // 将 TouchMoveDistance 重置为0后，要关闭动画，否则在下一次自动触发动画时滑动操作会有bug
    setTimeout(() => {
      setAnimation(false);
    }, duration + 50);
    isHovering.current = false;
    setTimer();
  };

  /**
   * 点击两侧的滑动控制按钮事件
   */
  const clickSlideBtn = useCallback(
    (flag: 'left' | 'right') => {
      if (flag === 'left') {
        if (!loop && currentIndex === 1) return;
        if (currentIndex === 0) {
          swiperTo(childrenLength - 1, { source: 'touch' });
        } else {
          swiperTo(currentIndex - 1, { source: 'touch' });
        }
      } else if (flag === 'right') {
        if (!loop && currentIndex === childrenLength) return;
        if (currentIndex === childrenLength + 1) {
          swiperTo(2, { source: 'touch' });
        } else {
          swiperTo(currentIndex + 1, { source: 'touch' });
        }
      }
    },
    [currentIndex, swiperTo, childrenLength, loop],
  );

  // navigation.type === 'fraction' 时当前滚动值
  const fractionCurrent = useMemo(() => {
    if (currentIndex < 1) {
      return childrenLength;
    }
    if (currentIndex > childrenLength) {
      return 1;
    }
    return currentIndex;
  }, [childrenLength, currentIndex]);

  // 构造 css 对象
  // 加入了 translateZ 属性是为了使移动的 div 单独列为一个 layer 以提高滑动性能，参考：https://segmentfault.com/a/1190000010364647
  let wrapperStyle = {};
  if (direction === 'vertical') {
    wrapperStyle = {
      height: `${swiperItemLength * 100}%`,
      top: wrapDisplacement,
      transition: animation ? `top ${duration / 1000}s` : '',
      flexDirection: 'column',
    };
  } else {
    wrapperStyle = {
      width: `${swiperItemLength * 100}%`,
      left: wrapDisplacement,
      transition: animation ? `left ${duration / 1000}s` : '',
      flexDirection: 'row',
    };
  }

  return (
    <div ref={swiper} className={switchClassName} style={{ overflow: 'hidden', height: `${height}px`, ...style }}>
      {/* 渲染子节点 */}
      <div
        ref={wrapperRef}
        className={`${classPrefix}-swiper__container`}
        style={wrapperStyle}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={(e) => handleTouchEnd(e)}
      >
        {swiperItemList}
      </div>
      {navigation && 'minShowNum' in navigation && childrenLength < navigation.minShowNum ? null : (
        <>
          {/* 渲染底部导航 */}
          {navigation && 'type' in navigation && (
            <span
              className={classNames(
                `${classPrefix}-swiper__pagination`,
                `${classPrefix}-swiper__pagination-${navigation.type}`,
              )}
            >
              {(['dots', 'dots-bar'].includes(navigation.type) &&
                childrenList.map((_: JSX.Element, i: number) => (
                  <span
                    key={i}
                    className={classNames(
                      `${classPrefix}-swiper-dot`,
                      i + 1 === currentIndex % (childrenLength + 1) ? `${classPrefix}-swiper-dot--active` : '',
                    )}
                    onClick={() => swiperTo(i + 1, { source: 'touch' })}
                  />
                ))) ||
                null}
              {(navigation.type === 'fraction' && <span>{`${fractionCurrent}/${childrenLength}`}</span>) || null}
            </span>
          )}
          {/* 渲染左右两边的按钮 */}
          {(direction === 'horizontal' && navigation && navigation.showSlideBtn && (
            <span>
              <span className={`${classPrefix}-swiper__btn btn-prev`} onClick={() => clickSlideBtn('left')}>
                <Icon name="chevron-left" size={16} />
              </span>
              <span className={`${classPrefix}-swiper__btn btn-next`} onClick={() => clickSlideBtn('right')}>
                <Icon name="chevron-right" size={16} />
              </span>
            </span>
          )) ||
            null}
        </>
      )}
    </div>
  );
};

Swiper.SwiperItem = SwiperItem;
Swiper.displayName = 'Swiper';

export default Swiper;
