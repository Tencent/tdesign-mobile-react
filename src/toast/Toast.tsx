import React, { FC, useRef, useState, useEffect } from 'react';
import { LoadingIcon, CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import Overlay from '../overlay';
import useMessageCssTransition from './hooks/useMessageCssTransition';
import useConfig from '../_util/useConfig';
import { TdToastProps } from './type';
import { StyledProps } from '../common';
import { toastDefaultProps } from './defaultProps';
import { usePrefixClass } from '../hooks/useClass';
import { useLockScroll } from '../hooks/useLockScroll';
import useDefaultProps from '../hooks/useDefaultProps';
import parseTNode from '../_util/parseTNode';

interface ToastProps extends TdToastProps, StyledProps {
  children?: React.ReactNode;
  el: React.ReactNode;
}

const themeIconMap = {
  loading: <LoadingIcon />,
  success: <CheckCircleIcon />,
  error: <CloseCircleIcon />,
};

const Toast: FC<ToastProps> = (originProps) => {
  const props = useDefaultProps<ToastProps>(originProps, toastDefaultProps);
  const {
    className,
    style,
    direction,
    placement,
    icon,
    message,
    duration,
    theme,
    preventScrollThrough,
    showOverlay,
    overlayProps,
    el,
    onClose,
  } = props;

  const { classPrefix } = useConfig();
  const toastClass = usePrefixClass('toast');
  const iconClasses = classNames([
    {
      [`${toastClass}__icon--${direction}`]: direction,
    },
  ]);

  const renderIconNode = () => {
    if (icon) return parseTNode(icon);
    return themeIconMap[theme];
  };

  const containerClass = classNames([
    `${toastClass}`,
    `${toastClass}__content`,
    `${toastClass}__icon`,
    {
      [`${toastClass}--${direction}`]: direction,
      [`${toastClass}__content--${direction}`]: direction,
      [`${toastClass}--loading`]: theme === 'loading',
    },
    className,
  ]);
  const topOptions = {
    top: '25%',
    bottom: '75%',
  };
  const computedStyle = { ...style, top: topOptions[placement] ?? '45%' };

  const textClasses = classNames([
    `${toastClass}__text`,
    {
      [`${toastClass}__text--${direction}`]: direction,
    },
  ]);

  const contentRef = useRef<HTMLDivElement>(null);

  const cssTransitionState = useMessageCssTransition({
    contentRef,
    classPrefix,
    el,
  });

  const [toastVisible, setToastVisible] = useState<boolean>(true);

  useLockScroll(contentRef, toastVisible && preventScrollThrough, toastClass);

  useEffect(() => {
    let timer = null;
    if (duration) {
      timer = setTimeout(() => {
        setToastVisible(false);
        onClose?.();
      }, duration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const getCustomOverlayProps = () => {
    const toastOverlayProps = {
      preventScrollThrough,
      visible: showOverlay,
    };
    return {
      ...overlayProps,
      ...toastOverlayProps,
    };
  };

  return (
    <>
      {showOverlay && <Overlay {...getCustomOverlayProps()} />}
      <CSSTransition in={toastVisible} appear {...cssTransitionState.props} unmountOnExit>
        <div className={containerClass} ref={contentRef} style={computedStyle}>
          <div className={iconClasses}>{renderIconNode()}</div>
          {message && <div className={textClasses}>{parseTNode(message)}</div>}
        </div>
      </CSSTransition>
    </>
  );
};

export default Toast;
