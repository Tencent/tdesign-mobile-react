import React, { FC, useRef, useState, useEffect } from 'react';
import { Icon } from 'tdesign-icons-react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import Overlay from '../overlay';
import useMessageCssTransition from './hooks/useMessageCssTransition';
import useConfig from '../_util/useConfig';
import { TdToastProps } from './type';
import { IconType } from './constant';
import { toastDefaultProps } from './defaultProps';
import useDefaultProps from '../hooks/useDefaultProps';
import parseTNode from '../_util/parseTNode';

interface ToastProps extends TdToastProps {
  children?: React.ReactNode;
  el: React.ReactNode;
}

const Toast: FC<TdToastProps> = (originProps: ToastProps) => {
  const props = useDefaultProps<ToastProps>(originProps, toastDefaultProps);
  const {
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
  const cls = `${classPrefix}-overflow-hidden`;
  const toastClass = `${classPrefix}-toast`;
  const iconClasses = classNames([
    {
      [`${toastClass}__icon--${direction}`]: direction,
    },
  ]);

  const TIcon = icon ? parseTNode(icon) : theme && <Icon name={IconType[theme]} />;
  const containerClass = classNames([
    `${toastClass}`,
    `${toastClass}__content`,
    `${toastClass}__icon`,
    {
      [`${toastClass}--${direction}`]: direction,
      [`${toastClass}__content--${direction}`]: direction,
      [`${toastClass}--loading`]: props.theme === 'loading',
    },
  ]);
  const topOptions = {
    top: '25%',
    bottom: '75%',
  };
  const computedStyle = { top: topOptions[placement] ?? '45%' };

  const textClasses = classNames([
    {
      [`${toastClass}__text`]: !TIcon,
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

  useEffect(() => {
    preventScrollThrough && document.body.classList.add(cls);
    return () => {
      preventScrollThrough && document.body.classList.remove(cls);
    };
  }, [preventScrollThrough, cls]);

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
          {TIcon && <div className={iconClasses}>{TIcon}</div>}
          {message && <div className={textClasses}>{parseTNode(message)}</div>}
        </div>
      </CSSTransition>
    </>
  );
};

export default Toast;
