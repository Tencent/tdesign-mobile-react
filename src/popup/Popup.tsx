import React, { FC, useEffect, useRef, useState } from 'react';
import Overlay from 'tdesign-mobile-react/overlay';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { TdPopupProps } from './type';
import  {useSpring } from 'react-spring'
import usePopupCssTransition from './hooks/usePopupCssTransition';
import useConfig from '../_util/useConfig';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import withNativeProps from 'tdesign-mobile-react/_util/withNativeProps';

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

const Popup: FC<TdPopupProps> = (props) => {

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

  // 判断是否受控
  const isControl = visible !== undefined;

  const [show, setShow] = useDefault<boolean, any>(
    visible,
    defaultVisible,
    onVisibleChange
  )
console.log(show);

  const contentTransitionClassName = getContentTransitionClassName(placement);

  const contentRef = useRef<HTMLDivElement>(null);

  const maskRef = useRef<HTMLDivElement>(null);

  const maskCssTransitionState = usePopupCssTransition({ contentRef: maskRef, classPrefix: 'fade' });

  const cssTransitionState = usePopupCssTransition({ contentRef, classPrefix: contentTransitionClassName });

  const rootStyles = {
    zIndex,
  };

  const handleOverlayClick = () => {
    setShow(false);
  };

  const {} = useSpring({
    opacity: show ? 0 : 100,
    config: {

    },
    onStart: () => {

    },
    onRest: () => {
      
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

  return withNativeProps(props,
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
      <div
        ref={contentRef}
          className={classnames([`${name}--content`, `${name}--content-${placement}`])}
      >
        {children}
      </div>
    </div>
  );
};

Popup.displayName = 'Popup'
Popup.defaultProps = defaultProps

export default Popup;
