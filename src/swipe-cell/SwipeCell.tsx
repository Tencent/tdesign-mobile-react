import React, { ReactNode, forwardRef, useImperativeHandle, useRef, useLayoutEffect, useMemo, memo } from 'react';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import classNames from 'classnames';
import { useClickAway } from 'ahooks';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import Button from '../button';
import useConfig from '../_util/useConfig';
import nearest from '../_util/nearest';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdSwipeCellProps, SwipeActionItem } from './type';
import { swipeCellDefaultProps } from './defaultProps';
import useDefaultProps from '../hooks/useDefaultProps';

import './style';

type SideType = 'left' | 'right';
export interface SwipeCellRef {
  expand: (side?: SideType, immediate?: boolean) => void;
  close: (immediate?: boolean) => void;
}

export interface SwipeCellProps extends TdSwipeCellProps, NativeProps {
  closeOnClick?: boolean;
  closeOnTouchOutside?: boolean;
  threshold?: number | string;
}

const SwipeCell = forwardRef<SwipeCellRef, SwipeCellProps>((originProps, ref) => {
  const props = useDefaultProps<SwipeCellProps>(originProps, swipeCellDefaultProps);

  const { left, right, content, disabled, opened, closeOnClick, threshold } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const getOpenedSide = (opened) => {
    if (isBoolean(opened)) {
      if (rightRef.current) {
        return 'right';
      }
      if (leftRef.current) {
        return 'left';
      }
      return;
    }
    if (isArray(opened)) {
      if (open[1] && rightRef.current) {
        return 'right';
      }
      if (open[0] && leftRef.current) {
        return 'left';
      }
    }
  };

  const isOpened = isBoolean(opened) ? opened : opened.includes(true);
  // 记录dragging和初始化expanded状态
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ctx = useMemo(() => ({ dragging: false, lastExpanded: '', initialExpanded: isOpened }), []);
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-swipe-cell`;

  const onChange = (side?: SideType) => {
    if (side !== ctx.lastExpanded) {
      props.onChange?.(side);
    }
    ctx.lastExpanded = side;
  };

  const getSideOffsetX = (side?: SideType) => {
    if (side === 'left' && leftRef.current) {
      return leftRef.current.offsetWidth;
    }
    if (side === 'right' && rightRef.current) {
      return -rightRef.current.offsetWidth;
    }
    return 0;
  };

  const [{ x }, api] = useSpring(
    () => ({
      x: 0,
      config: { tension: 200, friction: 30 },
    }),
    [],
  );

  const close = (immediate = false) => {
    api.start({ x: 0, immediate });
    onChange();
  };

  const expand = (side: SideType = 'right', immediate = false) => {
    api.start({
      x: getSideOffsetX(side),
      immediate,
    });
    onChange(side);
  };

  const bind = useDrag(
    (state) => {
      ctx.dragging = true;
      const [offsetX] = state.offset;
      if (state.last) {
        let position = offsetX + state.velocity[0] * state.direction[0] * 50;
        if (offsetX > 0) {
          position = Math.max(0, position);
        } else if (offsetX < 0) {
          position = Math.min(0, position);
        } else {
          position = 0;
        }
        const boundsLeft = getSideOffsetX('right');
        const boundsRight = getSideOffsetX('left');
        const nextX = nearest({
          items: [boundsLeft, 0, boundsRight],
          target: position,
          threshold,
          direction: offsetX - state.lastOffset[0] > 0 ? 1 : -1,
        });
        if (nextX === boundsLeft) {
          expand('right');
        } else if (nextX === boundsRight) {
          expand('left');
        } else {
          close();
        }
        window.setTimeout(() => {
          ctx.dragging = false;
        });
      } else {
        api.start({
          x: offsetX,
          immediate: true,
        });
      }
    },
    {
      from: () => [x.get(), 0],
      bounds: () => ({
        left: getSideOffsetX('right'),
        right: getSideOffsetX('left'),
      }),
      axis: 'x',
      preventScroll: true,
      pointer: { touch: true },
      enabled: !disabled,
    },
  );

  useImperativeHandle(ref, () => ({
    expand,
    close,
  }));

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const side = getOpenedSide(opened);

    if (['left', 'right'].includes(side)) {
      // 初始化expanded，等待dom加载完，获取left/right宽度后无动画设置展开状态
      expand(side as SideType, !!ctx.initialExpanded);
    } else {
      close();
    }
    delete ctx.initialExpanded;
    // 可以保证expand，close正常执行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, rootRef.current]);

  useClickAway(
    () => {
      if (x.get() !== 0) {
        close();
      }
    },
    rootRef,
    ['touchstart'],
  );

  const onActionClick = (action: SwipeActionItem, side: SideType) => {
    if (closeOnClick) close();
    if (action.onClick) action.onClick();
    if (props.onClick) props.onClick(action, side);
  };

  const renderActions = (actions: SwipeActionItem[] | ReactNode, side: SideType) => {
    if (isArray(actions)) {
      return actions.map((action, index) => {
        const btnClass = classNames([`${name}__content`, action.className || '']);
        const style = { height: '100%', ...action.style };
        const { icon: btnIcon, text: btnText, ...buttonProps } = action;

        return (
          <div
            key={index}
            className={btnClass}
            style={style}
            {...buttonProps}
            onClick={() => onActionClick(action, side)}
          >
            {btnIcon && <span className={`${name}__icon`}>{btnIcon}</span>}
            {btnText && <span className={`${name}__text`}>{btnText}</span>}
          </div>
        );
      });
    }
    return actions;
  };

  return withNativeProps(
    props,
    <div
      {...bind()}
      className={name}
      ref={rootRef}
      onClickCapture={(e) => {
        if (ctx.dragging) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <animated.div className={`${name}__wrapper`} style={{ x }}>
        {left && (
          <div className={`${name}__left`} ref={leftRef}>
            {renderActions(left, 'left')}
          </div>
        )}
        {content}
        {right && (
          <div className={`${name}__right`} ref={rightRef}>
            {renderActions(right, 'right')}
          </div>
        )}
      </animated.div>
    </div>,
  );
});

SwipeCell.defaultProps = swipeCellDefaultProps;
SwipeCell.displayName = 'SwipeCell';

export default memo(SwipeCell);
