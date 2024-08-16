import React, { FC, useState } from 'react';
import classnames from 'classnames';
import { useSpring, animated } from 'react-spring';
import Overlay from '../overlay';
import useDefault from '../_util/useDefault';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdPopupProps } from './type';
import useConfig from '../_util/useConfig';
import { popupDefaultProps } from './defaultProps';

export interface PopupProps extends TdPopupProps, NativeProps {}

enum PopupSourceEnum {
  OVERLAY = 'overlay',
}

enum PlacementEnum {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

const Popup: FC<PopupProps> = (props) => {
  const { children, placement, showOverlay, visible, defaultVisible, zIndex, overlayProps, onVisibleChange } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-popup`;

  const [show, setShow] = useDefault<boolean, any>(visible, defaultVisible, onVisibleChange);

  const [active, setActive] = useState(show);

  const handleOverlayClick = () => {
    setShow(false, PopupSourceEnum.OVERLAY);
  };

  const { progress, opacity } = useSpring({
    progress: show ? 0 : 100,
    opacity: show ? 1 : 0,
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      setActive(show);
    },
  });

  const contentStyle = {
    transform: progress.to((p) => {
      if (placement === PlacementEnum.BOTTOM) {
        return `translateY(${p}%)`;
      }
      if (placement === PlacementEnum.TOP) {
        return `translateY(-${p}%)`;
      }
      if (placement === PlacementEnum.LEFT) {
        return `translateX(-${p}%)`;
      }
      if (placement === PlacementEnum.RIGHT) {
        return `translateX(${p}%)`;
      }
    }),
    opacity: opacity.to((o) => {
      if (placement === PlacementEnum.CENTER) {
        return o;
      }
    }),
  };

  const rootStyles = {
    zIndex,
    display: active ? 'block' : 'none',
  };

  return withNativeProps(
    props,
    <div className={`${name}`} style={rootStyles}>
      {showOverlay && <Overlay visible={show} onClick={handleOverlayClick} {...overlayProps} />}
      <animated.div className={classnames([`${name}--content`, `${name}--content-${placement}`])} style={contentStyle}>
        {active && children}
      </animated.div>
    </div>,
  );
};

Popup.displayName = 'Popup';
Popup.defaultProps = popupDefaultProps;

export default Popup;
