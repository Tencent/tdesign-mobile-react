import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import Popup from '../popup';
import { TdDrawerProps, DrawerItem } from './type';

import useConfig from '../_util/useConfig';
import parseTNode from '../_util/parseTNode';
import { StyledProps } from '../common';
import useSetState from '../hooks/useSetState';
import useDefaultProps from '../hooks/useDefaultProps';
import { drawerDefaultProps } from './defaultProps';

export interface DrawerProps extends TdDrawerProps, StyledProps {
  isPlugin?: boolean;
}

const Drawer: React.FC<DrawerProps> = forwardRef((originProps, ref) => {
  const props = useDefaultProps<DrawerProps>(originProps, drawerDefaultProps);
  const [state, setState] = useSetState<DrawerProps>({ isPlugin: false, ...props });

  const {
    className,
    style,
    items,
    visible,
    title,
    footer,
    showOverlay,
    zIndex,
    isPlugin,
    closeOnOverlayClick,
    placement,
    onClose,
    onItemClick,
    onOverlayClick,
  } = state;

  useEffect(() => {
    if (isPlugin) {
      return;
    }
    // 插件式调用不会更新props, 只有组件式调用才会更新props
    setState((prevState) => ({ ...prevState, ...props }));
  }, [props, setState, isPlugin]);

  useImperativeHandle(ref, () => ({
    show() {
      setState({ visible: true });
    },
    hide() {
      setState({ visible: false });
    },
    destroy() {
      setState({ visible: false, destroyOnClose: true });
    },
    update(newOptions) {
      setState((prevState) => ({ ...prevState, ...newOptions }));
    },
  }));

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-drawer`;

  const handleClose = () => {
    onClose?.('overlay');
  };

  const [show, setShow] = useState(visible);

  const handleOverlayClick = (e) => {
    const context = { e };
    onOverlayClick?.(context);
    if (closeOnOverlayClick) {
      setShow(false);
      handleClose();
    }
  };

  const handleItemClick = (index: number, item: DrawerItem, e: React.MouseEvent<HTMLDivElement>) => {
    const context = { e };
    onItemClick?.(index, item, context);
  };

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const renderTitleNode = () => {
    if (!title) {
      return null;
    }
    const titleNode = parseTNode(title);
    return <div className={`${name}__title`}>{titleNode}</div>;
  };

  const renderFooterNode = () => {
    if (!footer) {
      return null;
    }
    return <div className={`${name}__footer`}>{footer}</div>;
  };

  return (
    <Popup
      visible={show}
      placement={placement}
      showOverlay={showOverlay}
      zIndex={zIndex}
      onVisibleChange={handleOverlayClick}
    >
      <div className={classNames(name, className)} style={{ ...style }}>
        {renderTitleNode()}
        <div className={`${name}__sidebar`}>
          {items?.map((item, index) => {
            const { title, icon } = item;
            return (
              <div
                key={title}
                className={`${name}__sidebar-item`}
                onClick={(e) => {
                  handleItemClick(index, item, e);
                }}
              >
                {!!icon && <span className={`${name}__sidebar-item-icon`}>{icon}</span>}
                <div className={`${name}__sidebar-item-title`}>{title}</div>
              </div>
            );
          })}
        </div>
        {renderFooterNode()}
      </div>
    </Popup>
  );
});

export default Drawer;
