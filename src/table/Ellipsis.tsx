import React, { useRef } from 'react';
import classNames from 'classnames';
import type { TNode } from '../common';

export interface EllipsisProps {
  content?: string | TNode;
  children?: string | TNode;
  popupContent?: string | number | TNode;
  attach?: () => HTMLElement;
  zIndex?: number;
  overlayClassName?: string;
  classPrefix?: string;
}

/** 超出省略显示 */
export default function Ellipsis(props: EllipsisProps) {
  const { classPrefix } = props;
  const root = useRef<HTMLDivElement>(null);
  const ellipsisClasses = classNames([`${classPrefix}-table__ellipsis`, `${classPrefix}-text-ellipsis`]);

  const cellNode = props.content || props.children;
  return (
    <div ref={root} className={ellipsisClasses}>
      {cellNode as React.ReactNode}
    </div>
  );
}

Ellipsis.displayName = 'Ellipsis';
