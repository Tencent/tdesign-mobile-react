import React, { FC, useEffect, useRef, useState } from 'react';
import Overlay from 'tdesign-mobile-react/overlay';
import classnames from 'classnames';
import  {useSpring, animated } from 'react-spring'
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import withNativeProps, { NativeProps } from 'tdesign-mobile-react/_util/withNativeProps';
import { TdPopupProps } from './type';
import usePopupCssTransition from './hooks/usePopupCssTransition';
import useConfig from '../_util/useConfig';

const getContentTransitionClassName = (placement) => {
  if (placement === 'center') {
    return `slide-zoom`;
  }
  return `slide-${placement}`;
};

const defaultProps = {
  placement: 'top',
  showOverlay: true,
  defaultVisible: false,
  zIndex: 1500,
}

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

  const contentTransitionClassName = getContentTransitionClassName(placement);
  console.log(contentTransitionClassName);
  

  const contentRef = useRef<HTMLDivElement>(null);

  const maskRef = useRef<HTMLDivElement>(null);

  const rootStyles = {
    zIndex,
    display: show ? 'unset' : 'none'
  };

  const handleOverlayClick = () => {
    setShow(false);
  };

  const { opacity } = useSpring({
    opacity: show ? 0 : 100,
    config: {

    },
    onStart: () => {
      setShow(true)
    },
    onRest: () => {
      setShow(visible);
    }
  })

  // useEffect(() => {
  //   visible && setCurrentVisible(visible);
  // }, [visible]);

  // useEffect(() => {
  //   defaultVisible && setCurrentVisible(defaultVisible);
  // }, [defaultVisible]);

  // useEffect(() => {
  //   // 非受控属性禁止触发onVisibleChange
  //   isControl && onVisibleChange && onVisibleChange(currentVisible);
  // }, [currentVisible, onVisibleChange, isControl]);

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

  return withNativeProps(
    props,
    <div className={`${name}`} style={rootStyles}>
      {
        showOverlay && (
          <Overlay 
            visible={show} 
            // onOverlayClick={handleOverlayClick} 
            disableBodyScroll={false}
          />
        )
      }
      <animated.div
        ref={contentRef}
        className={classnames([`${name}--content`, `${name}--content-${placement}`])}
        style={contentStyle}
      >
        {children}
      </animated.div>
      {/* <div
        ref={contentRef}
        className={classnames([`${name}--content`, `${name}--content-${placement}`])}
      >
        {children}
      </div> */}
    </div>
  );
};

Popup.displayName = 'Popup'
Popup.defaultProps = defaultProps

export default Popup;
