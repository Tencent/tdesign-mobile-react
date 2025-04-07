import React, { useMemo, forwardRef, useRef, useState, useEffect } from 'react';
import { reconvertUnit } from '../_util/convertUnit';
import Button from '../button';
import { TdFabProps } from './type';
import { StyledProps } from '../common';
import useConfig from '../hooks/useConfig';

export interface FabProps extends TdFabProps, StyledProps {}

const Fab: React.FC<FabProps> = forwardRef((props) => {
  const { buttonProps, icon = null, text, onClick } = props;

  const fabButtonRef = useRef(null);

  const [fabButtonSize, setFabButtonSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (fabButtonRef.current) {
      const info = window.getComputedStyle(fabButtonRef.current);

      setFabButtonSize({
        width: +reconvertUnit(info.width),
        height: +reconvertUnit(info.height),
      });
    }
  }, []);

  const [btnSwitchPos, setBtnSwitchPos] = useState({
    x: 16,
    y: 32,
  });
  const [switchPos, setSwitchPos] = useState({
    hasMoved: false, // exclude click event
    x: btnSwitchPos.x, // right
    y: btnSwitchPos.y, // bottom
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  const { classPrefix } = useConfig();
  const name = useMemo(() => `${classPrefix}-fab`, [classPrefix]);

  const onClickHandle = (e) => {
    onClick({ e });
  };

  const fabStyle = {
    ...props.style,
    right: `${btnSwitchPos.x}px`,
    bottom: `${btnSwitchPos.y}px`,
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    props.onDragStart?.({ e });

    setSwitchPos({
      ...switchPos,
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY,
    });
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

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault?.();

    if (!props.draggable) {
      return;
    }

    if (e.touches.length <= 0) {
      return;
    }
    const offsetX = e.touches[0].pageX - switchPos.startX;
    const offsetY = e.touches[0].pageY - switchPos.startY;
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
    setSwitchPos(toChangePos);
    setBtnSwitchPos(toChangeData);
  };

  const setSwitchPosition = (switchX: number, switchY: number) => {
    const [newSwitchX, newSwitchY] = getSwitchButtonSafeAreaXY(switchX, switchY);
    setSwitchPos({
      ...switchPos,
      x: newSwitchX,
      y: newSwitchY,
    });

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
    setSwitchPos({
      ...switchPos,
      startX: 0,
      startY: 0,
      hasMoved: false,
    });
    setSwitchPosition(switchPos.endX, switchPos.endY);
  };

  return (
    <div
      className={name}
      style={props.draggable && fabButtonSize.width ? { ...fabStyle } : props.style}
      onClick={onClickHandle}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Button
        ref={fabButtonRef}
        size="large"
        theme="primary"
        shape={props.text ? 'round' : 'circle'}
        className={`${name}__button`}
        {...(buttonProps as TdFabProps['buttonProps'])}
        icon={icon}
      >
        {text}
      </Button>
    </div>
  );
});

Fab.displayName = 'Fab';
export default Fab;
