import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { TdLoadingProps } from './type';
import { StyledProps } from '../common';
import useConfig from '../_util/useConfig';
import Spinner from './icon/Spinner';
import Gradient from './icon/Gradient';

export interface LoadingProps extends TdLoadingProps, StyledProps {}

const Loading: React.FC<LoadingProps> = ({
  children, // 子元素，同 content
  delay = 0, // 延迟显示加载效果的时间，用于防止请求速度过快引起的加载闪烁，单位：毫秒
  duration = 800, // 加载动画执行完成一次的时间，单位：毫秒
  indicator = true, // 是否显示加载指示符
  inheritColor = false, // 是否继承父元素颜色
  layout = 'horizontal', // 对齐方式
  loading = true, // 是否处于加载状态
  pause = false, // 是否暂停动画
  // preventScrollThrough = true, // 防止滚动穿透，全屏加载模式有效
  progress, // 加载进度
  reverse, // 加载动画是否反向
  size = '20px', // 尺寸，示例：40rpx/20px
  text, // 加载提示文案
  theme = 'circular', // 加载组件类型
}) => {
  const { classPrefix } = useConfig();

  const delayTimer = useRef(null);
  // 当延时加载delay有值时，值会发生变化
  const [reloading, setReloading] = useState(!delay && loading);

  const textContent = useMemo(() => {
    if (theme === 'error') {
      return '加载失败';
    }

    if (text) {
      return text;
    }

    return null;
  }, [theme, text]);

  useEffect(() => {
    setReloading(!delay && loading);
    if (delayTimer.current) clearTimeout(delayTimer.current);
    if (!delay || !loading) return;

    // 延时加载
    delayTimer.current = setTimeout(() => {
      setReloading(true);
      clearTimeout(delayTimer.current);
      delayTimer.current = null;
    }, delay);
  }, [delay, loading]);

  const progressCss = useMemo(() => {
    if (!progress || progress <= 0) return -100;
    if (progress > 1) return 0;
    return (-1 + progress) * 100;
  }, [progress]);

  const sizeClass = useMemo(() => {
    const SIZE_CLASSNAMES = {
      small: `${classPrefix}-size-s`,
      medium: `${classPrefix}-size-m`,
      large: `${classPrefix}-size-l`,
      default: '',
      xs: `${classPrefix}-size-xs`,
      xl: `${classPrefix}-size-xl`,
      block: `${classPrefix}-size-full-width`,
    };

    if (size === 'large' || size === 'medium' || size === 'small') {
      console.log(SIZE_CLASSNAMES[size]);
      return SIZE_CLASSNAMES[size];
    }
    return '';
  }, [size, classPrefix]);

  return (
    <>
      <div
        className={classNames(
          [`${classPrefix}-loading`],
          {
            [`${classPrefix}-loading--vertical`]: layout === 'vertical',
            [`${classPrefix}-loading--bar`]: theme === 'bar',
          },
          sizeClass,
        )}
        style={inheritColor ? { color: 'inherit' } : {}}
      >
        {/* theme = 'bar' 时 */}
        {(theme === 'bar' && progress && ![0, 1].includes(progress) && (
          <div className={`${classPrefix}-loading__bar`} style={{ transform: `translate3d(${progressCss}%, 0, 0)` }}>
            <div className={`${classPrefix}-loading__shadow`}></div>
          </div>
        )) ||
          null}
        {(theme !== 'bar' && (
          <>
            {(indicator && reloading && (
              <>
                {theme === 'circular' && <Gradient reverse={reverse} duration={duration} pause={pause} />}
                {theme === 'spinner' && <Spinner reverse={reverse} duration={duration} pause={pause} />}
                {theme === 'dots' && (
                  <div
                    style={
                      pause
                        ? { animation: 'none' }
                        : {
                            animation: `t-dot-typing ${duration / 1000}s infinite linear`,
                            animationDirection: `${reverse ? 'reverse' : 'normal'}`,
                          }
                    }
                    className={`${classPrefix}-loading__dots`}
                  />
                )}
              </>
            )) ||
              null}
            {(textContent && reloading && (
              <span
                className={classNames(`${classPrefix}-loading__text`, {
                  [`${classPrefix}-loading__text--error`]: theme === 'error',
                  [`${classPrefix}-loading__text--only`]: !indicator || theme === 'error',
                })}
              >
                {textContent}
              </span>
            )) ||
              null}
          </>
        )) ||
          null}
        {children}
      </div>
    </>
  );
};

export default Loading;
