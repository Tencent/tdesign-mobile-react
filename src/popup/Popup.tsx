import React, { forwardRef, useRef } from 'react';
import classnames from 'classnames';
import { CloseIcon } from 'tdesign-icons-react';
import { CSSTransition } from 'react-transition-group';
import Overlay from '../overlay';
import useDefault from '../_util/useDefault';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { TdPopupProps } from './type';
import { popupDefaultProps } from './defaultProps';
import useDefaultProps from '../hooks/useDefaultProps';
import { renderToContainer, getAttach } from '../_util/renderToContainer';
import parseTNode from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';

export interface PopupProps extends TdPopupProps, NativeProps {}

enum PopupSourceEnum {
  OVERLAY = 'overlay',
  CLOSEBTN = 'close-btn',
}

// enum PlacementEnum {
//   TOP = 'top',
//   BOTTOM = 'bottom',
//   LEFT = 'left',
//   RIGHT = 'right',
//   CENTER = 'center',
// }

const Popup = forwardRef<HTMLDivElement, PopupProps>((props) => {
  const {
    children,
    placement,
    showOverlay,
    visible,
    defaultVisible,
    zIndex,
    overlayProps,
    preventScrollThrough,
    attach,
    destroyOnClose,
    closeBtn,
    closeOnOverlayClick,
    onClose,
    // onClosed,
    // onOpen,
    // onOpened,
    onVisibleChange,
  } = useDefaultProps(props, popupDefaultProps);

  const duration = 300;

  const name = usePrefixClass('popup');

  const contentRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useDefault<boolean, any>(visible, defaultVisible, onVisibleChange);

  // const [active, setActive] = useState(show);

  const handleOverlayClick = (e) => {
    if (!closeOnOverlayClick) return;
    onClose?.(e);
    setShow(false, PopupSourceEnum.OVERLAY);
  };

  const handleCloseClick = (e) => {
    onClose?.(e);
    setShow(false, PopupSourceEnum.CLOSEBTN);
  };

  // const { progress, opacity } = useSpring({
  //   progress: show ? 0 : 100,
  //   opacity: show ? 1 : 0,
  //   config: {
  //     duration,
  //   },
  //   onStart: () => {
  //     if (show) {
  //       onOpen?.();
  //     }
  //     setActive(true);
  //   },
  //   onRest: () => {
  //     setActive(show);
  //     if (show) {
  //       onOpened?.();
  //     } else {
  //       onClosed?.();
  //     }
  //   },
  // });

  const contentStyle = {
    // transform: progress.to((p) => {
    //   if (placement === PlacementEnum.BOTTOM) {
    //     return `translateY(${p}%)`;
    //   }
    //   if (placement === PlacementEnum.TOP) {
    //     return `translateY(-${p}%)`;
    //   }
    //   if (placement === PlacementEnum.LEFT) {
    //     return `translateX(-${p}%)`;
    //   }
    //   if (placement === PlacementEnum.RIGHT) {
    //     return `translateX(${p}%)`;
    //   }
    //   if (placement === PlacementEnum.CENTER) {
    //     return `scale(${1 - p / 100}) translate3d(-50%, -50%, 0)`;
    //   }
    // }),
    // opacity: opacity.to((o) => {
    //   if (placement === PlacementEnum.CENTER) {
    //     return o;
    //   }
    // }),
    zIndex,
    // display: active ? null : 'none',
    // transition: 'none',
    // transformOrigin: '0 0',
  };

  const closeBtnNode = !closeBtn ? null : (
    <div className={`${name}__close`} onClick={handleCloseClick}>
      {parseTNode(closeBtn, props, <CloseIcon size={24} />)}
    </div>
  );

  const node = (
    <>
      <Overlay
        visible={show && showOverlay}
        onClick={handleOverlayClick}
        preventScrollThrough={preventScrollThrough}
        duration={duration}
        {...overlayProps}
      />
      <CSSTransition
        in={show}
        appear={true}
        unmountOnExit={destroyOnClose}
        timeout={duration}
        nodeRef={contentRef}
        classNames={{
          // enter: `slide-${placement}-enter`,
          enterActive: `slide-${placement}-enter-active`,
          // exit: `slide-${placement}-leave`,
          exitActive: `slide-${placement}-leave-active`,
        }}
      >
        {withNativeProps(
          props,
          <div ref={contentRef} className={classnames([name, `${name}--${placement}`])} style={contentStyle}>
            {closeBtnNode}
            {parseTNode(children)}
          </div>,
        )}
      </CSSTransition>
    </>
  );
  return attach ? renderToContainer(getAttach(attach), node) : node;
});

Popup.displayName = 'Popup';

export default Popup;
