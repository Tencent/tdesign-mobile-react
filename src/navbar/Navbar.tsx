import React, { useCallback, useMemo } from 'react';
import { StyledProps } from 'tdesign-mobile-react/common';
import { ChevronLeftIcon, IconFont } from 'tdesign-icons-react';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import ClassNames from 'classnames';
import { TdNavbarProps } from './type';

export interface NavbarProps extends TdNavbarProps, StyledProps {}

export const Navbar = React.memo<NavbarProps>((props) => {
  const {
    visible = true,
    title,
    children,
    leftIcon = true,
    homeIcon = true,
    rightIcon,
    titleMaxLength,
    onTextClick,
    onHomeClick,
    onLeftClick,
  } = props;
  const { classPrefix } = useConfig();
  const prefix = useMemo(() => `${classPrefix}-navbar`, [classPrefix]);

  const cls = useCallback((name?: string) => (name ? `${prefix}__${name}` : prefix), [prefix]);

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

  const onHomeClickHandle = useCallback(() => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.history.back();
    }
  }, [onHomeClick]);

  const leftIconChildren = useMemo(() => {
    if (!leftIcon) return null;

    if (React.isValidElement(leftIcon)) return <div className={cls('back')}>{leftIcon}</div>;

    let home = <ChevronLeftIcon className={cls('back--arrow')} onClick={onHomeClickHandle} />;

    if (typeof homeIcon === 'string') {
      home = <IconFont className={cls('back--arrow')} name={homeIcon} onClick={onHomeClickHandle} />;
    }

    const other = typeof leftIcon === 'string' ? <IconFont className={cls('back--arrow')} name={leftIcon} /> : null;

    return (
      <div className={cls('back')}>
        {home}
        {other}
      </div>
    );
  }, [leftIcon, cls, onHomeClickHandle, homeIcon]);

  const rightChildren = useMemo(() => <div className={cls('right')}>{rightIcon}</div>, [cls, rightIcon]);

  return visible ? (
    <div className={ClassNames(cls(), props.className)}>
      {leftIconChildren}
      {titleChildren}
      {rightChildren}
    </div>
  ) : null;
});

export default Navbar;
