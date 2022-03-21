import React, { useCallback, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { useScroll, useMount } from 'ahooks';
import smoothscroll from 'smoothscroll-polyfill';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdBackTopProps } from './type';

export enum BackTopTheme {
  ROUND = 'round',
  HALF_ROUND = 'half-round',
  ROUND_DARK = 'round-dark',
  HALF_ROUND_DARK = 'half-round-dark',
}

const BackTop: React.FC<TdBackTopProps> = (prop) => {
  const { fixed = true, icon = 'backtop', target = () => window, text = '', theme = BackTopTheme.ROUND } = prop;

  const [show, setShow] = useState(false);

  const { classPrefix } = useConfig();

  const scroll = useScroll(document);

  useMount(() => {
    smoothscroll.polyfill();
  });

  const isWindow = (obj) => obj !== null && obj.window === window;

  const targetHeight = useMemo(
    () => (isWindow(target) ? 0 : (target() as unknown as HTMLElement).offsetTop || 0),
    [target],
  );

  useEffect(() => {
    // 当滚动条滚动到超过锚点一个屏幕后，显示回到顶部按钮
    const screenHeight = window.innerHeight;
    if (scroll?.top > screenHeight + targetHeight) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [scroll, targetHeight]);

  const onClick = useCallback(() => {
    document.documentElement.scrollTo({ top: targetHeight, behavior: 'smooth' });
  }, [targetHeight]);

  const backTopIcon =
    typeof icon === 'string' ? <Icon className={`${classPrefix}-back-top__icon`} name={icon} /> : icon;

  return (
    <>
      <div
        className={classNames(`${classPrefix}-back-top`, `${classPrefix}-back-top--${theme}`, {
          [`${classPrefix}-is-fixed`]: fixed,
          'back-top-hidden': !show,
          'back-top-show': show,
        })}
        onClick={onClick}
      >
        {backTopIcon}
        {text && <div className={classNames(`${classPrefix}-back-top__text`, `${classPrefix}-class-text`)}>{text}</div>}
      </div>
    </>
  );
};

export default BackTop;
