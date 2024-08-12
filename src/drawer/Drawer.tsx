import React, { useEffect, useState } from 'react';
import { Popup } from 'tdesign-mobile-react';
import { TdDrawerProps, DrawerCloseContext, DrawerItem } from './type';
import useConfig from '../_util/useConfig';

enum PopupSourceEnum {
  OVERLAY = 'overlay',
}

const Drawer: React.FC<TdDrawerProps> = (props) => {
  const { items, visible, showOverlay, zIndex, closeOnOverlayClick, placement, onClose, onItemClick, onOverlayClick } =
    props;

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-drawer`;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const event: DrawerCloseContext = {
      trigger: PopupSourceEnum.OVERLAY,
      e,
    };
    onClose?.(event);
  };

  const [show, setShow] = useState(visible);

  const handleOverlayClick = (e) => {
    const context = { e };
    onOverlayClick?.(context);
    if (closeOnOverlayClick) {
      setShow(false);
      handleClose(e);
    }
  };

  const handleItemClick = (index: number, item: DrawerItem, e: React.MouseEvent<HTMLDivElement>) => {
    const context = { e };
    onItemClick?.(index, item, context);
  };

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <div className={`${name}`}>
      <Popup
        visible={show}
        placement={placement}
        showOverlay={showOverlay}
        zIndex={zIndex}
        onVisibleChange={handleOverlayClick}
      >
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
      </Popup>
    </div>
  );
};

export default Drawer;
