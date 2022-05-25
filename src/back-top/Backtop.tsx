import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useScroll, useMount, useBoolean } from 'ahooks';
import smoothscroll from 'smoothscroll-polyfill';
import isString from 'lodash/isString';
import { Icon } from 'tdesign-icons-react';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import useConfig from '../_util/useConfig';
import { TdBackTopProps } from './type';

export type ThemeList = 'round' | 'half-round' | 'round-dark' | 'half-round-dark';

export type BackTopProps = TdBackTopProps & NativeProps;

export const defaultProps = {
  fixed: true,
  icon: 'backtop',
  target: (() => window) as any,
  text: '',
  theme: 'round' as ThemeList,
};

const BackTop: React.FC<BackTopProps> = (props) => {
  const { fixed, icon, target, text, theme } = props;

  const [show, { setTrue, setFalse }] = useBoolean(false);

  const backTopDom = useRef<HTMLElement>(null);

  backTopDom.current = target();

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-back-top`;

  const scroll = useScroll(document);

  useMount(() => {
    smoothscroll.polyfill();
  });

  const isWindow = (obj) => obj !== null && obj.window === window;

  const targetHeight = isWindow(backTopDom.current) ? 0 : backTopDom.current?.offsetTop || 0;

  useEffect(() => {
    // 当滚动条滚动到超过锚点二分之一个屏幕后，显示回到顶部按钮
    const screenHeight = window.innerHeight;
    if (scroll?.top > screenHeight / 2 + targetHeight) {
      setTrue();
    } else {
      setFalse();
    }
  }, [scroll, setTrue, setFalse, targetHeight]);

  const onClick = () => document.documentElement.scrollTo({ top: targetHeight, behavior: 'smooth' });

  return withNativeProps(
    props,
    <div
      className={classNames(`${name}`, `${name}--${theme}`, {
        [`${classPrefix}-is-fixed`]: fixed,
        'back-top-hidden': !show,
        'back-top-show': show,
      })}
      onClick={onClick}
    >
      {isString(icon) ? <Icon className={`${name}__icon`} name={icon} /> : icon}
      {text && <div className={classNames(`${name}__text`, `${classPrefix}-class-text`)}>{text}</div>}
    </div>,
  );
};

BackTop.defaultProps = defaultProps;
BackTop.displayName = 'BackTop';

export default BackTop;
