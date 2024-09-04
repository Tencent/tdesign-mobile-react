import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useConfig from '../_util/useConfig';
import { TdStickyProps } from './type';
import { stickyDefaultProps } from './defaultProps';
import { resolveContainer } from '../_util/getContainer';
import useDefaultProps from '../hooks/useDefaultProps';

const Sticky: FC<TdStickyProps> = (originProps) => {
  const props = useDefaultProps(originProps, stickyDefaultProps);

  const { children, container, disabled, offsetTop, zIndex, onScroll } = props;

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-sticky`;

  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const boxElement = boxRef?.current;
  const contentElement = contentRef?.current;

  const [boxStyles, seBoxStyles] = useState({});
  const [contentStyles, setContentStyles] = useState({});

  const [contentTop, setContentTop] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const [boxTop, setBoxTop] = useState(undefined);

  const containerRef = useRef(null);

  // 滚动监听器
  const scrollhandler = useCallback(() => {
    const boxTop = boxElement?.getBoundingClientRect()?.top;
    const contentTop = contentElement?.getBoundingClientRect()?.top;
    const contentHeight = contentElement?.getBoundingClientRect()?.height;
    setBoxTop(boxTop);
    setContentTop(contentTop);
    setContentHeight(contentHeight);
  }, [boxElement, contentElement]);

  /**
   * 用于处理content变成fixed定位脱离文档流，导致父级box高度为0
   */
  useLayoutEffect(() => {
    seBoxStyles({
      height: contentElement?.getBoundingClientRect()?.height,
    });
  }, [contentElement]);

  useEffect(() => {
    containerRef.current = resolveContainer(container);
  }, [container]);

  useLayoutEffect(() => {
    const style: any = {
      zIndex,
    };

    let isFixed = false;
    if (disabled) return style;
    const offsetTopNum = Number(offsetTop);

    if (containerRef.current) {
      const containerTop = containerRef.current?.getBoundingClientRect()?.top;
      const containerHeight = containerRef.current?.getBoundingClientRect()?.height;

      if (containerHeight + containerTop < offsetTopNum + contentHeight) {
        style.transform = `translate3d(0, ${containerHeight - contentHeight}px, 0)`;
      } else if (boxTop <= offsetTopNum) {
        style.position = 'fixed';
        style.top = `${offsetTopNum}px`;
        isFixed = true;
      }
    } else if (boxTop <= offsetTopNum) {
      style.position = 'fixed';
      style.top = `${offsetTopNum}px`;
      isFixed = true;
    }

    onScroll && onScroll({ scrollTop: contentTop, isFixed });
    setContentStyles(style);

    // 这里只需要监听boxTop，不需要全部监听
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxTop]);

  useEffect(() => {
    addEventListener('scroll', scrollhandler);
    return () => {
      removeEventListener('scroll', scrollhandler);
    };
  }, [boxTop, contentTop, contentHeight, scrollhandler]);

  return (
    <>
      <div ref={boxRef} className={name} style={boxStyles}>
        <div ref={contentRef} className={`${name}__content`} style={contentStyles}>
          {children}
        </div>
      </div>
    </>
  );
};

Sticky.displayName = 'Sticky';

export default Sticky;
