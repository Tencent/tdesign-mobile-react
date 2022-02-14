import React, { forwardRef } from 'react';
import classnames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdButtonProps } from './type';
import noop from '../_util/noop';

export interface ButtonProps extends TdButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef((props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const {
    className = '',
    block = false,
    children,
    content = '',
    disabled = false,
    ghost = false,
    // icon,
    loading = false,
    shape = 'square',
    size = 'medium',
    theme = 'default',
    type = 'button',
    variant = 'base',
    onClick = noop,
  } = props;
  const { classPrefix } = useConfig();

  return (
    <button
      ref={ref}
      type={type}
      className={classnames(
        [`${classPrefix}-button`, `${classPrefix}-button--${variant}`, `${classPrefix}-button--${theme}`, className],
        {
          [`${classPrefix}-button--shape-${shape}`]: shape !== 'round',
          [`${classPrefix}-button--ghost`]: ghost,
          [`${classPrefix}-s`]: size === 'small',
          [`${classPrefix}-m`]: size === 'medium',
          [`${classPrefix}-l`]: size === 'large',
          [`${classPrefix}-is-loading`]: loading,
          [`${classPrefix}-is-disabled`]: disabled,
          [`${classPrefix}-size-full-width`]: block,
        },
      )}
      onClick={!loading && !disabled && onClick}
      disabled={disabled || loading}
    >
      {content || children || ''}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
