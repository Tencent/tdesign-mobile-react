import React, { ReactNode, forwardRef, useImperativeHandle, useRef, useLayoutEffect, useMemo, memo } from 'react';
import isArray from 'lodash/isArray';
import identity from 'lodash/identity';
import { useClickAway } from 'ahooks';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import Button from '../button';
import useConfig from '../_util/useConfig';
import nearest from '../_util/nearest';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdSwipeCellProps, SwipeActionItem } from './type';

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

const defaultProps = {
  disabled: false,
  left: null,
  right: null,
  closeOnClick: false,
  closeOnTouchOutside: true,
  threshold: '50%',
  onChange: identity,
  onClick: identity,
};

const SwipeCell = forwardRef<SwipeCellRef, SwipeCellProps>((props, ref) => {
  const { left, right, content, disabled, expanded, closeOnClick, closeOnTouchOutside, threshold } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  // 记录dragging和初始化expanded状态
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ctx = useMemo(() => ({ dragging: false, lastExpanded: expanded, initialExpanded: expanded }), []);
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-swipe-cell`;

  const onChange = (side?: SideType) => {
    if (side !== ctx.lastExpanded) {
      props.onChange(side);
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
    if (['left', 'right'].includes(expanded)) {
      // 初始化expanded，等待dom加载完，获取left/right宽度后无动画设置展开状态
      expand(expanded, !!ctx.initialExpanded);
    } else {
      close();
    }
    delete ctx.initialExpanded;
    // 可以保证expand，close正常执行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, rootRef.current]);

  useClickAway(
    () => {
      if (closeOnTouchOutside && x.get() !== 0) {
        close();
      }
    },
    rootRef,
    ['touchstart'],
  );

  const onActionClick = (action: SwipeActionItem, side: SideType) => {
    if (closeOnClick) close();
    if (action.onClick) action.onClick();
    if (props.onClick) props.onClick({ action, source: side });
  };

  const rederActions = (actions: SwipeActionItem[] | ReactNode, side: SideType) => {
    if (isArray(actions)) {
      return actions.map((action, index) => {
        const { text, ...buttonProps } = action;
        return (
          // @ts-ignore, SwipeActionItem.style不应该是string，而是CSSProperties
          <Button key={index} {...buttonProps} onClick={() => onActionClick(action, side)}>
            {text}
          </Button>
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
            {rederActions(left, 'left')}
          </div>
        )}
        <div
          className={`${name}__content`}
          onClickCapture={(e) => {
            if (closeOnClick && x.goal !== 0) {
              e.preventDefault();
              e.stopPropagation();
              close();
            }
          }}
        >
          {content}
        </div>
        {right && (
          <div className={`${name}__right`} ref={rightRef}>
            {rederActions(right, 'right')}
          </div>
        )}
      </animated.div>
    </div>,
  );
});

SwipeCell.defaultProps = defaultProps;
SwipeCell.displayName = 'SwipeCell';

export default memo(SwipeCell);
