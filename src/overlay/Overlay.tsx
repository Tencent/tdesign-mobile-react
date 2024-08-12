import React, { forwardRef, useEffect, useRef, useMemo, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { StyledProps } from '../common';
import { TdOverlayProps } from './type';
import { overlayDefaultProps } from './defaultProps';
import { useLockScroll } from '../hooks/useLockScroll';
import parseTNode from '../_util/parseTNode';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';

export interface OverlayProps extends TdOverlayProps, StyledProps {}

const Overlay = forwardRef<HTMLDivElement, OverlayProps>((props) => {
  const overlayClass = usePrefixClass('overlay');
  const maskRef = useRef<HTMLDivElement>();

  const { className, style, backgroundColor, children, duration, preventScrollThrough, visible, zIndex, onClick } =
    useDefaultProps<OverlayProps>(props, overlayDefaultProps);

  const [shouldRender, setShouldRender] = useState(visible); // 确保 CSSTransition 只在 visible 变为 true 时渲染

  useLockScroll(maskRef, visible && preventScrollThrough, overlayClass);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }
  }, [visible]);

  const handleExited = () => {
    if (!visible) {
      setShouldRender(false);
    }
  };

  const overlayStyles = useMemo(
    () => ({
      zIndex,
      backgroundColor,
      ...style,
    }),
    [zIndex, backgroundColor, style],
  );

  const handleClick = (e) => {
    onClick?.({ e });
  };

  return (
    shouldRender && (
      <CSSTransition
        in={visible}
        appear
        timeout={duration}
        nodeRef={maskRef}
        classNames={{
          enter: `${overlayClass}-enter-from`,
          enterActive: `${overlayClass}-enter-active`,
          exit: `${overlayClass}-leave-to`,
          exitActive: `${overlayClass}-leave-active`,
        }}
        onExited={handleExited}
        unmountOnExit
      >
        <div
          ref={maskRef}
          className={classNames(className, overlayClass, {
            [`${overlayClass}--active`]: visible,
          })}
          style={overlayStyles}
          onClick={handleClick}
        >
          {parseTNode(children)}
        </div>
      </CSSTransition>
    )
  );
});

Overlay.displayName = 'Overlay';

export default Overlay;
