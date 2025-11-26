import React, { forwardRef, useImperativeHandle, useRef, useMemo, useState, useEffect } from 'react';
import { isArray, isBoolean } from 'lodash-es';
import classNames from 'classnames';
import { useClickAway } from 'ahooks';
import { useDrag } from '@use-gesture/react';
import parseTNode from '../_util/parseTNode';
import nearest from '../_util/nearest';
import withNativeProps from '../_util/withNativeProps';
import { TdSwipeCellProps, SwipeActionItem, Sure } from './type';
import { swipeCellDefaultProps } from './defaultProps';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import useLayoutEffect from '../hooks/useLayoutEffect';
import { Styles, StyledProps, TNode } from '../common';

import './style';

type SideType = 'left' | 'right';
export interface SwipeCellRef {
  expand: (side?: SideType, immediate?: boolean) => void;
  close: (immediate?: boolean) => void;
}

export interface SwipeCellProps extends TdSwipeCellProps, StyledProps {}

const threshold = '50%';

export const syncOpenedState = (
  rootRef: React.RefObject<HTMLDivElement>,
  opened: SwipeCellProps['opened'],
  getOpenedSide: (opened: SwipeCellProps['opened']) => SideType | undefined,
  expand: (side: SideType) => void,
  close: () => void,
  setTimer: (callback: () => void, delay: number) => void,
) => {
  if (!rootRef.current) return;

  const side = getOpenedSide(opened);

  if (side === 'left' || side === 'right') {
    // 初始化 expanded，等待 dom 加载完，获取 left/right 宽度后无动画设置展开状态
    // 防止 left/right 为列表时，获取真实宽度有误
    setTimer(() => {
      expand(side);
    }, 100);
  } else {
    close();
  }
};

const SwipeCell = forwardRef<SwipeCellRef, SwipeCellProps>((originProps, ref) => {
  const props = useDefaultProps<SwipeCellProps>(originProps, swipeCellDefaultProps);

  const { left, right, content, disabled, opened, className, style } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [curSure, setSure] = useState<{
    content: Sure;
    width: number;
    transform: string;
  }>({ content: '', width: 0, transform: 'none' });

  // Helper function to set timers that are tracked for cleanup
  const setTimer = (callback: () => void, delay: number) => {
    const timerId = setTimeout(() => {
      // Remove completed timer from tracking array
      const index = timersRef.current.indexOf(timerId);
      if (index > -1) {
        timersRef.current.splice(index, 1);
      }
      callback();
    }, delay);
    timersRef.current.push(timerId);
    return timerId;
  };

  // Cleanup all timers on unmount
  useEffect(
    () => () => {
      timersRef.current.forEach((timerId) => clearTimeout(timerId));
      timersRef.current = [];
    },
    [],
  );

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
      if (opened[1] && rightRef.current) {
        return 'right';
      }
      if (opened[0] && leftRef.current) {
        return 'left';
      }
    }
  };

  const isOpened = isBoolean(opened) ? opened : opened.includes(true);
  // 记录dragging和初始化expanded状态
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ctx = useMemo(() => ({ dragging: false, lastExpanded: '', initialExpanded: isOpened }), []);
  const swipeCellClass = usePrefixClass('swipe-cell');
  const onChange = (side?: SideType) => {
    if (side !== ctx.lastExpanded) {
      props.onChange?.(side);
    }
    ctx.lastExpanded = side;
  };

  const getSideOffsetX = (side?: SideType) => {
    if (side === 'left' && leftRef.current) {
      return leftRef.current.clientWidth;
    }
    if (side === 'right' && rightRef.current) {
      return -rightRef.current.clientWidth;
    }
    return 0;
  };

  const [x, setX] = useState(0);

  const close = () => {
    setX(0);
    onChange();
    if (curSure.content) {
      setTimer(() => {
        setSure({
          content: '',
          width: 0,
          transform: 'none',
        });
      }, 300);
    }
  };

  const expand = (side: SideType = 'right') => {
    const x = getSideOffsetX(side);
    setX(x);
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
        setTimer(() => {
          ctx.dragging = false;
        }, 0);
      } else {
        setX(offsetX);
      }
    },
    {
      from: () => [x, 0],
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
    syncOpenedState(rootRef, opened, getOpenedSide, expand, close, setTimer);
    // 可以保证expand，close正常执行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, rootRef.current]);

  useClickAway(
    () => {
      if (x !== 0) {
        close();
      }
    },
    rootRef,
    ['touchstart'],
  );

  const onActionClick = (action: SwipeActionItem, side: SideType) => {
    if (action.sure) {
      setSure({
        content: action.sure,
        width: getSideOffsetX(side),
        transform: side === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
      });
      setTimer(() => {
        setSure((current) => ({
          ...current,
          transform: 'none',
        }));
      }, 0);
      return;
    }

    if (action.onClick) action.onClick();
    if (props.onClick) props.onClick(action, side);
  };

  const renderActions = (actions: SwipeActionItem[] | TNode, side: SideType) => {
    if (isArray(actions)) {
      return actions.map((action: SwipeActionItem, index: number) => {
        const btnClass = classNames([`${swipeCellClass}__content`, action.className || '']);
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
            {btnIcon && <span className={`${swipeCellClass}__icon`}>{btnIcon}</span>}
            {btnText && <span className={`${swipeCellClass}__text`}>{btnText}</span>}
          </div>
        );
      });
    }
    return parseTNode(actions);
  };

  const renderSureContent = () => {
    if (curSure.content) {
      const style: Styles = {
        width: Math.abs(curSure.width),
        transition: 'all .3s ease-in-out',
        transform: curSure.transform,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      };
      return <div style={{ ...style }}>{parseTNode(curSure.content)}</div>;
    }
    return null;
  };

  return withNativeProps(
    props,
    <div
      {...bind()}
      className={classNames(swipeCellClass, className)}
      ref={rootRef}
      style={style}
      onClickCapture={(e) => {
        if (ctx.dragging) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <div className={`${swipeCellClass}__wrapper`} style={{ transform: `translateX(${x}px)` }}>
        {left && (
          <div className={`${swipeCellClass}__left`} ref={leftRef}>
            {renderSureContent()}
            {renderActions(left, 'left')}
          </div>
        )}
        {parseTNode(content)}
        {right && (
          <div className={`${swipeCellClass}__right`} ref={rightRef}>
            {renderSureContent()}
            {renderActions(right, 'right')}
          </div>
        )}
      </div>
    </div>,
  );
});

SwipeCell.displayName = 'SwipeCell';

export default SwipeCell;
