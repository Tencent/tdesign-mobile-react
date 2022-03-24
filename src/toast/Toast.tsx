import React, { FC, useRef, useState, useEffect } from 'react';
import { Icon } from 'tdesign-icons-react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import Mask from '../mask';
import useMessageCssTransition from './hooks/useMessageCssTransition';
import useConfig from '../_util/useConfig';
import { TdToastProps } from './type';
import { IconType } from './constant';

interface ToastProps extends TdToastProps {
  children?: React.ReactNode;
  el: React.ReactNode;
}

const Toast: FC<TdToastProps> = (props: ToastProps) => {
  const {
    direction = 'row',
    placement = 'middle',
    icon,
    message,
    // children,
    duration,
    theme,
    preventScrollThrough,
    el,
  } = props;
  const { classPrefix } = useConfig();
  const cls = `${classPrefix}-overflow-hidden`;
  const TIcon = icon || (theme && <Icon className={`${classPrefix}-icon`} name={IconType[theme]} />);
  const containerClass = [
    `${classPrefix}-toast--${direction || 'row'}`,
    `${classPrefix}-toast--${placement}`,
    icon && !message && `${classPrefix}-toast--icononly`,
  ];

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
      }, duration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  useEffect(() => {
    preventScrollThrough && document.body.classList.add(cls);
    return () => {
      preventScrollThrough && document.body.classList.remove(cls);
    };
  }, [preventScrollThrough, cls]);

  return (
    <>
      {preventScrollThrough && <Mask />}
      <CSSTransition in={toastVisible} appear {...cssTransitionState.props} unmountOnExit>
        <div className={classNames(`${classPrefix}-toast`, [...containerClass])} ref={contentRef}>
          {TIcon && TIcon}
          {message && <div className={classNames(`${classPrefix}-toast__text`)}>{message}</div>}
        </div>
      </CSSTransition>
    </>
  );
};

export default Toast;
