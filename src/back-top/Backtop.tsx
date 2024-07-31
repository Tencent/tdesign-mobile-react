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
  visibilityHeight: 200,
};

const BackTop: React.FC<BackTopProps> = (props) => {
  const { fixed, icon, target, text, theme, onToTop, visibilityHeight, container } = props;

  const [show, { setTrue, setFalse }] = useBoolean(false);

  const backTopDom = useRef<HTMLElement>(null);

  backTopDom.current = target();

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-back-top`;

  const getContainer = (container: Function) => {
    if (typeof container === 'function') {
      return container();
    }
    return document.documentElement;
  };
  const containerDom = useRef<HTMLElement>(null);
  containerDom.current = getContainer(container);

  const scroll = useScroll(typeof container === 'function' ? containerDom.current : document);

  useMount(() => {
    smoothscroll.polyfill();
  });

  const isWindow = (obj) => obj !== null && obj.window === window;

  const targetHeight = isWindow(backTopDom.current) ? 0 : backTopDom.current?.offsetTop || 0;

  useEffect(() => {
    // 当滚动条滚动到 设置滚动高度时，显示回到顶部按钮
    if (scroll?.top >= visibilityHeight) {
      setTrue();
    } else {
      setFalse();
    }
  }, [scroll, setTrue, setFalse, visibilityHeight]);

  const onClick = () => {
    containerDom.current.scrollTo({ top: 0 + targetHeight, behavior: 'smooth' });
    onToTop?.();
  };

  return withNativeProps(
    props,
    <div
      className={classNames(`${name}`, `${name}--${theme}`, {
        [`${name}--fixed`]: fixed,
      })}
      style={{ zIndex: 99999, opacity: show ? 1 : 0 }}
      onClick={onClick}
    >
      {isString(icon) ? <Icon className={`${name}__icon`} name={icon} /> : icon}
      {text && (
        <div className={classNames(`${name}__text--${theme}`)} style={{ width: 'auto', minWidth: 12, maxWidth: 24 }}>
          {text}
        </div>
      )}
    </div>,
  );
};

BackTop.defaultProps = defaultProps;
BackTop.displayName = 'BackTop';

export default BackTop;
