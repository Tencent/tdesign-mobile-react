import React, { useMemo } from 'react';
import classnames from 'classnames';
import TLoading from '../loading';
import parseTNode from '../_util/parseTNode';
import { TdButtonProps } from './type';
import { buttonDefaultProps } from './defaultProps';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import useHover from '../hooks/useHover';

export interface ButtonProps
  extends TdButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'content' | 'children'> {}

const Button: React.FC<ButtonProps> = (originProps) => {
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
  const buttonClass = usePrefixClass('button');
  const childNode = content || children;

  const hoverDisabled = useMemo(() => disabled || loading, [disabled, loading]);
  const ref = useHover({ className: `${buttonClass}--hover`, disabled: hoverDisabled });

  return (
    <button
      ref={ref}
      type={type}
      className={classnames(
        [
          `${buttonClass}`,
          `${buttonClass}--size-${size}`,
          `${buttonClass}--${variant}`,
          `${buttonClass}--${theme}`,
          `${buttonClass}--${shape}`,
          className,
        ],
        {
          [`${buttonClass}--ghost`]: ghost,
          [`${buttonClass}--loading`]: loading,
          [`${buttonClass}--disabled`]: disabled,
          [`${buttonClass}--block`]: block,
        },
      )}
      style={style}
      onClick={!loading && !disabled ? onClick : undefined}
      disabled={disabled || loading}
    >
      {loading ? <TLoading inheritColor {...loadingProps} /> : parseTNode(icon)}
      {childNode && <span className={`${buttonClass}__content`}> {parseTNode(childNode)}</span>}
      {parseTNode(suffix)}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
