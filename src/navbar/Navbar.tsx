import React, { forwardRef, useMemo, useCallback } from 'react';
import { ChevronLeftIcon } from 'tdesign-icons-react';
// import { useConfig } from "../config";
import { NavbarProps } from './NavbarProps';

const defaultProps: NavbarProps = {
  leftArrow: true,
  title: 'NavBar 导航条',
  maxLen: 6,
  rightShow: true,
  right: null,
  left: null,
  onClickRight: () => null,
  onClickText: () => null,
  children: null,
};

const Navbar = forwardRef<HTMLDivElement, NavbarProps>((props, ref) => {
  const {
    title,
    maxLen,
    rightShow,
    leftArrow,
    children,
    left: renderLeftSlotContent,
    right: renderRightSlotContent,
    onClickRight,
    onClickText,
  } = props;

  const classPrefix = 't';

  const nTitleContent = useMemo(() => {
    if (title && title.trim().length > maxLen) {
      return `${title.slice(0, maxLen)}...`;
    }
    return title;
  }, [title, maxLen]);

  const handleBack = useCallback(() => {
    if (history.length > 1) {
      history.back();
    }
  }, []);

  const componentName = `${classPrefix}-navbar`;

  const renderLeftArrow = leftArrow ? (
    <span className={`${componentName}__back--arrow`}>
      <ChevronLeftIcon />
    </span>
  ) : null;

  const renderRightShow = rightShow ? (
    <i onClick={handleBack} className={`${componentName}__right--more`}>
      <svg
        // t="1614321969302"
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2091"
        width="24"
        height="24"
      >
        <path
          d="M512 449.749333a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m-318.805333-1.109333a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m638.677333 0a64 64 0 1 1 0 128 64 64 0 0 1 0-128z"
          fill="#444444"
          p-id="2092"
        ></path>
      </svg>
    </i>
  ) : null;

  return (
    <div className={componentName} ref={ref}>
      <div className={`${componentName}__back`} onClick={onClickRight}>
        {renderLeftArrow}
        {renderLeftSlotContent}
      </div>

      <div className={`${componentName}__text`} onClick={onClickText}>
        {children || nTitleContent}
      </div>

      <div className={`${componentName}__right`}>
        {renderRightSlotContent}
        {renderRightShow}
      </div>
    </div>
  );
});

Navbar.displayName = 'TDesignNavbar';
Navbar.defaultProps = defaultProps;

export default Navbar;
