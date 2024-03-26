import React, { FC, useEffect, useMemo, useCallback, CSSProperties } from 'react';
import { CheckCircleIcon, CloseCircleIcon, LoadingIcon } from 'tdesign-icons-react';
import classNames from 'classnames';
import Overlay from '../overlay';
import useConfig from '../_util/useConfig';
import { TdToastProps } from './type';
import { IconType } from './constant';

interface ToastProps extends TdToastProps {
  children?: React.ReactNode;
  el: React.ReactNode;
}

const toastTypeIcon = {
  loading: LoadingIcon,
  success: CheckCircleIcon,
  error: CloseCircleIcon,
};

const Toast: FC<TdToastProps> = (props: ToastProps) => {
  const {
    direction = 'row',
    placement = 'middle',
    icon,
    message,
    theme,
    preventScrollThrough,
    showOverlay,
    overlayProps,
  } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-toast`;
  const bodyLockClass = `${name}-overflow-hidden`;

  const TIcon = icon || toastTypeIcon[theme as IconType] || null;

  const classes = useMemo(
    () =>
      classNames(name, `${name}__content`, `${name}__icon`, {
        [`${name}--${direction}`]: direction,
        [`${name}__content--${direction}`]: direction,
        [`${name}--loading`]: theme === 'loading',
      }),
    [name, direction, theme],
  );

  const textClasses = useMemo(
    () =>
      classNames({
        [`${name}__text`]: !TIcon,
        [`${name}__text--${direction}`]: direction,
      }),
    [direction, TIcon, name],
  );

  const iconClasses = useMemo(
    () =>
      classNames({
        [`${name}__icon--${direction}`]: direction,
      }),
    [direction, name],
  );

  const lock = useCallback(() => {
    document.body.classList.add(bodyLockClass);
  }, [bodyLockClass]);

  const unlock = useCallback(() => {
    document.body.classList.remove(bodyLockClass);
  }, [bodyLockClass]);

  const customOverlayProps = useMemo(() => {
    const toastOverlayProps = {
      preventScrollThrough,
      visible: showOverlay,
    };
    // props.preventScrollThrough ? lock() : unlock();
    return {
      ...overlayProps,
      ...toastOverlayProps,
    };
  }, [preventScrollThrough, showOverlay, overlayProps]);

  useEffect(() => {
    preventScrollThrough ? lock() : unlock();
  }, [preventScrollThrough, lock, unlock]);

  useEffect(
    () => () => {
      unlock();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const topStyle: CSSProperties = useMemo(() => {
    if (placement === 'top') {
      return {
        top: '25%',
      };
    }
    return placement === 'bottom' ? { top: '75%' } : { top: '45%' };
  }, [placement]);

  return (
    <div>
      <Overlay {...customOverlayProps}></Overlay>
      <div className={classes} style={topStyle}>
        {TIcon ? <div className={iconClasses}>{TIcon}</div> : null}
        {message ? <div className={textClasses}>{message}</div> : null}
      </div>
    </div>
  );
};

export default Toast;
