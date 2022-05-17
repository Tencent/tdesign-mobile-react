import React, { FC, useEffect, useRef, useState } from 'react';
import Overlay from 'tdesign-mobile-react/overlay';
import classnames from 'classnames';
import  {useSpring, animated } from 'react-spring'
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import withNativeProps, { NativeProps } from 'tdesign-mobile-react/_util/withNativeProps';
import { TdPopupProps } from './type';
import usePopupCssTransition from './hooks/usePopupCssTransition';
import useConfig from '../_util/useConfig';
import { useUnmountedRef } from 'ahooks';
import { popupDefaultProps } from './defaultProps';
import { LogoGithubIcon } from 'tdesign-icons-react';

const getContentTransitionClassName = (placement) => {
  if (placement === 'center') {
    return `slide-zoom`;
  }
  return `slide-${placement}`;
};

export interface PopupProps extends TdPopupProps, NativeProps {}

const Popup: FC<PopupProps> = (props) => {

  const {
    children,
    placement,
    showOverlay,
    visible,
    defaultVisible,
    zIndex,
    onVisibleChange,
  } = props;

  const { classPrefix } = useConfig();

  const name = `${classPrefix}-popup`;

  const [show, setShow] = useDefault<boolean, any>(
    visible,
    defaultVisible,
    onVisibleChange
  )

  const [active, setActive] = useState(show);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = () => {
    setShow(false);
  };

  const { opacity } = useSpring({
    opacity: show ? 0 : 100,
    onStart: () => {
      // setShow(true)
      setActive(true)
    },
    onRest: () => {
      console.log(show);
      
      setActive(show);
      // console.log(visible);
    }
  })

  const contentStyle = {
    transform: opacity.to(o => {
      if (placement === 'bottom') {
        return `translateY(${o}%)`;
      } 
      if (placement === 'top') {
        return `translateY(-${o}%)`;
      } 
      if (placement === 'left') {
        return `translateX(-${o}%)`;
      } 
      if (placement === 'right') {
        return `translateX(${o}%)`;
      }
      if (placement === 'center') {
        return `translateZ(${o}%)`;
      }
      return 'none';
    })
  }

  const rootStyles = {
    zIndex,
    display: active ? 'block' : 'none'
  };

  return withNativeProps(
    props,
    <div className={`${name}`} style={rootStyles}>
      {
        showOverlay && (
          <Overlay 
            visible={show} 
            onOverlayClick={handleOverlayClick} 
            disableBodyScroll={false}
          />
        )
      }
      <animated.div
        // ref={contentRef}
        className={classnames([`${name}--content`, `${name}--content-${placement}`])}
        style={contentStyle}
      >
        {children}
      </animated.div>
    </div>
  );
};

Popup.displayName = 'Popup'
Popup.defaultProps = popupDefaultProps;

export default Popup;
