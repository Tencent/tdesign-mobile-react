import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Popup } from '../popup';
import parseTNode from '../_util/parseTNode';
import type { TNode } from '../common';

export interface EllipsisProps {
  content?: string | TNode;
  children?: string | TNode;
  popupContent?: string | number | TNode;
  attach?: () => HTMLElement;
  zIndex?: number;
  overlayClassName?: string;
  classPrefix?: string;
  /** 透传给 Popup 的属性，如 placement/title/closeBtn 等 */
  popupProps?: Record<string, any>;
}

/** 超出省略，点击溢出内容弹出浮层预览 */
export default function Ellipsis(props: EllipsisProps) {
  const { classPrefix, content, children, popupContent, attach, zIndex, overlayClassName, popupProps } = props;
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const ellipsisClasses = classNames(
    `${classPrefix}-table__ellipsis`,
    `${classPrefix}-text-ellipsis`,
    overlayClassName,
  );
  const cellNode = parseTNode((content || children) as TNode);

  // 仅在内容溢出时弹出预览
  const handleClick = () => {
    const el = root.current;
    if (el && el.scrollWidth > el.clientWidth) setVisible(true);
  };

  const closeBtn = popupProps?.closeBtn ?? true;
  const placement = popupProps?.placement || 'bottom';

  return (
    <>
      <div ref={root} className={ellipsisClasses} onClick={handleClick}>
        {cellNode}
      </div>
      <Popup
        className={`${classPrefix}-table__popup ${classPrefix}-table__popup--${placement}`}
        visible={visible}
        onVisibleChange={setVisible}
        placement={placement}
        showOverlay={popupProps?.showOverlay !== false}
        closeOnOverlayClick={popupProps?.closeOnOverlayClick !== false}
        closeBtn={closeBtn}
        zIndex={zIndex}
        attach={attach}
      >
        <div className={`${classPrefix}-table__popup-inner`}>
          {popupProps?.title ? (
            <div className={`${classPrefix}-table__popup-title`}>{parseTNode(popupProps.title as TNode)}</div>
          ) : null}
          <div
            className={classNames(`${classPrefix}-table__popup-content`, {
              [`${classPrefix}-table__popup-content--center`]: placement === 'center',
              [`${classPrefix}-table__popup-content--with-close`]: closeBtn !== false,
            })}
          >
            {popupContent != null ? parseTNode(popupContent as TNode) : cellNode}
          </div>
        </div>
      </Popup>
    </>
  );
}

Ellipsis.displayName = 'Ellipsis';
