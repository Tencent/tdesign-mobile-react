import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { reconvertUnit } from '../_util/convertUnit';
import Button from '../button';
import { TdFabProps } from './type';
import { fabDefaultProps } from './defaultProps';
import { StyledProps } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import parseTNode from '../_util/parseTNode';

export interface FabProps extends TdFabProps, StyledProps {
  children?: React.ReactNode;
}

const Fab: React.FC<FabProps> = (originProps) => {
  const props = useDefaultProps(originProps, fabDefaultProps);
  const { children, buttonProps, icon = null, text, onClick } = props;

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
  const switchPosRef = useRef({
    hasMoved: false, // exclude click event
    x: btnSwitchPos.x, // right
    y: btnSwitchPos.y, // bottom
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  const onClickHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick({ e });
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    props.onDragStart?.({ e });

    switchPosRef.current = {
      ...switchPosRef.current,
      x: btnSwitchPos.x,
      y: btnSwitchPos.y,
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
    e.stopPropagation();
    e.preventDefault();

    if (!props.draggable) {
      return;
    }

    if (e.touches.length <= 0) {
      return;
    }

    const offsetX = e.touches[0].clientX - switchPosRef.current.startX;
    const offsetY = e.touches[0].clientY - switchPosRef.current.startY;
    const x = Math.floor(switchPosRef.current.x - offsetX);
    const y = Math.floor(switchPosRef.current.y - offsetY);

    const [newX, newY] = getSwitchButtonSafeAreaXY(x, y);

    const toChangeData = { ...btnSwitchPos };
    const toChangePos = { ...switchPosRef.current, hasMoved: true };

    if (props.draggable !== 'vertical') {
      toChangeData.x = newX;
      toChangePos.endX = newX;
    }
    if (props.draggable !== 'horizontal') {
      toChangeData.y = newY;
      toChangePos.endY = newY;
    }
    switchPosRef.current = toChangePos;
    setBtnSwitchPos(toChangeData);
  };

  useEffect(() => {
    const fab = fabRef.current;
    fab?.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      fab?.removeEventListener('touchmove', onTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.draggable, fabButtonSize.width, fabButtonSize.height]);

  const setSwitchPosition = (switchX: number, switchY: number) => {
    const [newSwitchX, newSwitchY] = getSwitchButtonSafeAreaXY(switchX, switchY);
    switchPosRef.current = {
      ...switchPosRef.current,
      x: newSwitchX,
      y: newSwitchY,
    };

    // 使用函数式更新避免闭包陷阱
    setBtnSwitchPos((prev) => {
      const newPos = { ...prev };
      if (props.draggable !== 'vertical') {
        newPos.x = newSwitchX;
      }
      if (props.draggable !== 'horizontal') {
        newPos.y = newSwitchY;
      }
      return newPos;
    });
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!switchPosRef.current.hasMoved) {
      return;
    }
    props.onDragEnd?.({ e });
    switchPosRef.current = {
      ...switchPosRef.current,
      startX: 0,
      startY: 0,
      hasMoved: false,
    };
    setSwitchPosition(switchPosRef.current.endX, switchPosRef.current.endY);
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

  const fabStyle = props.draggable
    ? {
        right: `${btnSwitchPos.x}px`,
        bottom: `${btnSwitchPos.y}px`,
      }
    : props.style || {
        right: `${btnSwitchPos.x}px`,
        bottom: `${btnSwitchPos.y}px`,
      };

  return (
    <div
      ref={fabRef}
      className={fabClass}
      style={fabStyle}
      onClick={onClickHandle}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {parseTNode(children, null, defaultContent)}
    </div>
  );
};

Fab.displayName = 'Fab';
export default Fab;
