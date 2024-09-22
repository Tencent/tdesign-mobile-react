import React, { forwardRef } from 'react';
import classnames from 'classnames';
import TLoading from '../loading';
import useConfig from '../_util/useConfig';
import parseTNode from '../_util/parseTNode';
import { TdButtonProps } from './type';
import { buttonDefaultProps } from './defaultProps';
import useDefaultProps from '../hooks/useDefaultProps';

export interface ButtonProps
  extends TdButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'content' | 'children'> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((originProps, ref) => {
  const props = useDefaultProps(originProps, buttonDefaultProps);
  const {
    className,
    style,
    block,
    children,
    content,
    disabled,
    ghost,
    icon,
    suffix,
    loading,
    shape,
    size,
    theme,
    type,
    variant,
    onClick,
    loadingProps,
  } = props;
  const { classPrefix } = useConfig();

  const childNode = content || children;

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
      {loading ? <TLoading inheritColor {...loadingProps} /> : parseTNode(icon)}
      {childNode && <span className={`${classPrefix}-button__content`}> {parseTNode(childNode)}</span>}
      {parseTNode(suffix)}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
