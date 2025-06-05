import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { reconvertUnit } from '../_util/convertUnit';
import Button from '../button';
import { TdFabProps } from './type';
import { fabDefaultProps } from './defaultProps';
import { StyledProps } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';

export interface FabProps extends TdFabProps, StyledProps {}

const Fab: React.FC<FabProps> = (originProps) => {
  const props = useDefaultProps(originProps, fabDefaultProps);
  const { buttonProps, icon = null, text, onClick } = props;

  const fabClass = usePrefixClass('fab');

  const fabRef = useRef<HTMLDivElement>(null);

  const [fabButtonSize, setFabButtonSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const button = document.querySelector(`.${fabClass}__button`);
    if (button) {
      const info = window.getComputedStyle(button);

      setFabButtonSize({
        width: +reconvertUnit(info.width),
        height: +reconvertUnit(info.height),
      });
    }
  }, [fabClass]);

  const [btnSwitchPos, setBtnSwitchPos] = useState({
    x: 16,
    y: 32,
  });
  let switchPos = {
    hasMoved: false, // exclude click event
    x: btnSwitchPos.x, // right
    y: btnSwitchPos.y, // bottom
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  };

  const onClickHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick({ e });
  };

  const fabStyle = {
    ...props.style,
    right: `${btnSwitchPos.x}px`,
    bottom: `${btnSwitchPos.y}px`,
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    props.onDragStart?.({ e });

    switchPos = {
      ...switchPos,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
    };
  };

  const getSwitchButtonSafeAreaXY = (x: number, y: number) => {
    const bottomThreshold = reconvertUnit(props.yBounds?.[1] ?? 0);
    const topThreshold = reconvertUnit(props.yBounds?.[0] ?? 0);

    const docWidth = Math.min(window.innerWidth, document.documentElement.clientWidth, screen.width);
    const docHeight = Math.min(window.innerHeight, document.documentElement.clientHeight, screen.height);

    const maxY = docHeight - fabButtonSize.height - topThreshold;
    const maxX = docWidth - fabButtonSize.width;

    const resultX = Math.max(0, Math.min(maxX, x));
    const resultY = Math.max(bottomThreshold, Math.min(maxY, y));

    return [resultX, resultY];
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!switchPos.hasMoved) {
      switchPos = {
        ...switchPos,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
      };
    }

    e.stopPropagation();
    e.preventDefault();

    if (!props.draggable) {
      return;
    }

    if (e.touches.length <= 0) {
      return;
    }

    const offsetX = e.touches[0].clientX - switchPos.startX;
    const offsetY = e.touches[0].clientY - switchPos.startY;
    const x = Math.floor(switchPos.x - offsetX);
    const y = Math.floor(switchPos.y - offsetY);

    const [newX, newY] = getSwitchButtonSafeAreaXY(x, y);

    const toChangeData = { ...btnSwitchPos };
    const toChangePos = { ...switchPos, hasMoved: true };

    if (props.draggable !== 'vertical') {
      toChangeData.x = newX;
      toChangePos.endX = newX;
    }
    if (props.draggable !== 'horizontal') {
      toChangeData.y = newY;
      toChangePos.endY = newY;
    }
    switchPos = toChangePos;
    setBtnSwitchPos(toChangeData);
  };

  useEffect(() => {
    const fab = fabRef.current;
    fab && fab.addEventListener('touchmove', onTouchMove, { passive: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSwitchPosition = (switchX: number, switchY: number) => {
    const [newSwitchX, newSwitchY] = getSwitchButtonSafeAreaXY(switchX, switchY);
    switchPos = {
      ...switchPos,
      x: newSwitchX,
      y: newSwitchY,
    };

    if (props.draggable !== 'vertical') {
      setBtnSwitchPos({
        ...btnSwitchPos,
        x: switchX,
      });
    }
    if (props.draggable !== 'horizontal') {
      setBtnSwitchPos({
        ...btnSwitchPos,
        y: switchY,
      });
    }
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!switchPos.hasMoved) {
      return;
    }
    props.onDragEnd?.({ e });
    switchPos = {
      ...switchPos,
      startX: 0,
      startY: 0,
      hasMoved: false,
    };
    setSwitchPosition(switchPos.endX, switchPos.endY);
  };
  const defaultContent = (
    <Button
      size="large"
      theme="primary"
      shape={props.text ? 'round' : 'circle'}
      className={`${fabClass}__button`}
      {...(buttonProps as TdFabProps['buttonProps'])}
      icon={icon}
    >
      {text}
    </Button>
  );

  return (
    <div
      ref={fabRef}
      className={fabClass}
      style={props.draggable && fabButtonSize.width ? { ...fabStyle } : props.style}
      onClick={onClickHandle}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {props.children || defaultContent}
    </div>
  );
};

Fab.displayName = 'Fab';
export default Fab;
