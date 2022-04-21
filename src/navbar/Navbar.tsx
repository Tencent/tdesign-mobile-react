import React, { CSSProperties, useCallback, useMemo, useState } from 'react';
import { StyledProps } from 'tdesign-mobile-react/common';
import { ChevronLeftIcon, IconFont, HomeIcon } from 'tdesign-icons-react';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import ClassNames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import useUnmountedRef from 'ahooks/lib/useUnmountedRef';
import { TdNavbarProps } from './type';

export interface NavbarProps extends TdNavbarProps, StyledProps {}

export const Navbar = React.memo<NavbarProps>((props) => {
  const {
    visible = true,
    title,
    children,
    leftIcon = false,
    homeIcon,
    fixed = true,
    animation = true,
    rightIcon,
    titleMaxLength,
    onTextClick,
    onHomeClick,
    style,
    className,
    onLeftClick,
  } = props;
  const { classPrefix } = useConfig();
  const unmountRef = useUnmountedRef();

  const prefix = useMemo(() => `${classPrefix}-navbar`, [classPrefix]);

  const cls = useCallback((name?: string) => (name ? `${prefix}__${name}` : prefix), [prefix]);

  const [active, setActive] = useState(visible);

  // 动画
  const navbarSpring = useSpring({
    opacity: visible ? 1 : 0,
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      if (unmountRef.current) return;
      setActive(visible);
    },
  });

  // 标题
  const titleChildren = useMemo(() => {
    let titleNode = children || title;

    if (typeof titleNode === 'string' && titleNode.length > titleMaxLength) {
      titleNode = `${titleNode.slice(0, titleMaxLength)}...`;
    }

    return (
      <div className={cls('text')} onClick={onTextClick}>
        {titleNode}
      </div>
    );
  }, [children, cls, onTextClick, title, titleMaxLength]);

  // 返回icon点击
  const onLeftClickHandle = useCallback(() => {
    if (onLeftClick) {
      onLeftClick();
    } else {
      window.history.back();
    }
  }, [onLeftClick]);

  // 主页icon点击
  const onHomeClickHandle = useCallback(() => {
    if (onHomeClick) {
      onHomeClick();
    }
  }, [onHomeClick]);

  // 返回图标
  const leftIconDom = useMemo(() => {
    if (!leftIcon) return null;

    if (React.isValidElement(leftIcon)) return leftIcon;

    if (typeof leftIcon === 'string')
      return <IconFont className={cls('back--arrow')} name={leftIcon} onClick={onLeftClickHandle} />;

    return <ChevronLeftIcon className={cls('back--arrow')} onClick={onLeftClickHandle} />;
  }, [cls, leftIcon, onLeftClickHandle]);

  // 主页图标
  const homeIconDom = useMemo(() => {
    if (!homeIcon) return null;

    if (React.isValidElement(homeIcon)) return homeIcon;

    if (typeof homeIcon === 'string')
      return <IconFont className={cls('back--arrow')} name={homeIcon} onClick={onHomeClickHandle} />;

    return <HomeIcon className={cls('back--arrow')} onClick={onHomeClickHandle} size="21px" />;
  }, [cls, homeIcon, onHomeClickHandle]);

  /** 左侧icon区域 */
  const leftAreaIcon = useMemo(
    () =>
      leftIconDom || homeIconDom ? (
        <div className={cls('back')}>
          {leftIconDom}
          {homeIconDom}
        </div>
      ) : null,
    [cls, leftIconDom, homeIconDom],
  );

  /** 右侧icon */
  const rightAreaIcon = useMemo(() => <div className={cls('right')}>{rightIcon}</div>, [cls, rightIcon]);

  // 样式
  const navStyle = useMemo<CSSProperties>(
    () => ({
      position: fixed ? 'fixed' : 'relative',
      top: 0,
      left: 0,
      width: '100%',
      ...style,
    }),
    [fixed, style],
  );

  // 导航主体
  const navBar = useMemo(
    () =>
      active ? (
        <div className={ClassNames(cls(), className)} style={navStyle}>
          {leftAreaIcon}
          {titleChildren}
          {rightAreaIcon}
        </div>
      ) : null,
    [active, className, cls, leftAreaIcon, navStyle, rightAreaIcon, titleChildren],
  );

  return animation ? <animated.div style={navbarSpring}>{navBar}</animated.div> : navBar;
});

export default Navbar;
