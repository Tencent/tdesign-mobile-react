import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPopper, Placement } from '@popperjs/core';
import { useClickAway } from 'ahooks';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import classNames from 'classnames';
import { TdPopoverProps } from './type';
import { StyledProps } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { popoverDefaultProps } from './defaultProps';
import { parseContentTNode } from '../_util/parseTNode';
import useDefault from '../_util/useDefault';

export interface PopoverProps extends TdPopoverProps, StyledProps {}

const Popover: React.FC<PopoverProps> = (props) => {
  const {
    closeOnClickOutside,
    className,
    style,
    content,
    placement,
    showArrow,
    theme,
    triggerElement,
    children,
    visible,
    defaultVisible,
    onVisibleChange,
  } = useDefaultProps<PopoverProps>(props, popoverDefaultProps);

  const [currentVisible, setVisible] = useDefault(visible, defaultVisible, onVisibleChange);
  const [active, setActive] = useState(visible);
  const referenceRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<ReturnType<typeof createPopper> | null>(null);
  const popoverClass = usePrefixClass('popover');
  const contentClasses = useMemo(
    () =>
      classNames({
        [`${popoverClass}__content`]: true,
        [`${popoverClass}--${theme}`]: true,
      }),
    [popoverClass, theme],
  );

  const getPopperPlacement = (placement: PopoverProps['placement']): Placement =>
    placement?.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end') as Placement;

  const placementPadding = ({
    popper,
    reference,
    placement,
  }: {
    popper: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
    reference: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
    placement: String;
  }) => {
    const horizontal = ['top', 'bottom'];
    const vertical = ['left', 'right'];
    const isBase = [...horizontal, ...vertical].find((item) => item === placement);
    if (isBase) {
      return 0;
    }

    const { width, x } = reference;
    const { width: popperWidth, height: popperHeight } = popper;
    const { width: windowWidth } = window.screen;

    const isHorizontal = horizontal.find((item) => placement.includes(item));
    const isEnd = placement.includes('end');
    const small = (a: number, b: number) => (a < b ? a : b);
    if (isHorizontal) {
      const padding = isEnd ? small(width + x, popperWidth) : small(windowWidth - x, popperWidth);
      return {
        [isEnd ? 'left' : 'right']: padding - 22,
      };
    }

    const isVertical = vertical.find((item) => placement.includes(item));
    if (isVertical) {
      return {
        [isEnd ? 'top' : 'bottom']: popperHeight - 22,
      };
    }
  };

  const getPopoverOptions = () => ({
    placement: getPopperPlacement(placement),
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: placementPadding,
        },
      },
    ],
  });

  const destroyPopper = () => {
    if (popperRef.current) {
      popperRef.current?.destroy();
      popperRef.current = null;
    }
  };

  const animationClassNames: CSSTransitionClassNames = {
    enter: `${popoverClass}--animation-enter`,
    enterActive: `${popoverClass}--animation-enter-active ${popoverClass}--animation-enter-to`,
    exitActive: `${popoverClass}--animation-leave-active ${popoverClass}--animation-leave-to`,
    exitDone: `${popoverClass}--animation-leave-done`,
  };

  const updatePopper = () => {
    if (currentVisible && referenceRef.current && popoverRef.current) {
      popperRef.current = createPopper(referenceRef.current, popoverRef.current, getPopoverOptions());
    }
    return null;
  };

  const updateVisible = (visible) => {
    if (visible === currentVisible) return;
    setVisible(visible);
  };

  const onClickAway = () => {
    if (currentVisible && closeOnClickOutside) {
      updateVisible(false);
    }
  };

  useClickAway(() => {
    onClickAway();
  }, [referenceRef.current, popoverRef.current]);

  const onClickReference = () => {
    updateVisible(!currentVisible);
  };

  useEffect(() => {
    setVisible(visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    destroyPopper();
    updatePopper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement]);

  useEffect(
    () => () => {
      onClickAway();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const contentStyle = useMemo<React.CSSProperties>(
    () => ({
      display: active ? null : 'none',
    }),
    [active],
  );

  const renderArrow = () => <div className={`${popoverClass}__arrow`} data-popper-arrow />;
  const renderContentNode = () => (
    <div ref={popoverRef} data-popper-placement={placement} className={`${popoverClass}`} style={contentStyle}>
      <div className={contentClasses}>
        {parseContentTNode(content, {})}
        {showArrow && renderArrow()}
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={referenceRef}
        className={classNames(`${popoverClass}__wrapper`, className)}
        style={style}
        onClick={onClickReference}
      >
        {children}
        {triggerElement}
      </div>
      <CSSTransition
        in={currentVisible}
        classNames={animationClassNames}
        timeout={200}
        onEnter={() => {
          updatePopper();
          setActive(true);
        }}
        onExited={() => {
          destroyPopper();
          setActive(false);
        }}
        nodeRef={popoverRef}
      >
        <>{renderContentNode()}</>
      </CSSTransition>
    </>
  );
};

Popover.displayName = 'Popover';

export default Popover;
