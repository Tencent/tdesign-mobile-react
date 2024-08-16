import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { LoadingIcon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdButtonProps } from './type';
import noop from '../_util/noop';
import { buttonDefaultProps } from './defaultProps';

export interface ButtonProps extends TdButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'content'> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className = '',
    style,
    block,
    children,
    content = '',
    disabled,
    ghost,
    icon = null,
    suffix = null,
    loading,
    shape,
    size,
    theme,
    type,
    variant,
    onClick = noop,
    loadingProps = {},
  } = props;
  const { classPrefix } = useConfig();

  return (
    <button
      ref={ref}
      type={type}
      className={classnames(
        [
          `${classPrefix}-button`,
          `${classPrefix}-button--size-${size}`,
          `${classPrefix}-button--${variant}`,
          `${classPrefix}-button--${theme}`,
          `${classPrefix}-button--${shape}`,
          className,
        ],
        {
          [`${classPrefix}-button--ghost`]: ghost,
          [`${classPrefix}-button--loading`]: loading,
          [`${classPrefix}-button--disabled`]: disabled,
          [`${classPrefix}-button--block`]: block,
        },
      )}
      style={style}
      onClick={!loading && !disabled ? onClick : undefined}
      disabled={disabled || loading}
    >
      {loading ? <LoadingIcon {...loadingProps} /> : icon}
      {content || children ? <span className={`${classPrefix}-button__content`}> {content || children}</span> : ''}
      {suffix}
    </button>
  );
});

Button.displayName = 'Button';
Button.defaultProps = buttonDefaultProps;

export default Button;
