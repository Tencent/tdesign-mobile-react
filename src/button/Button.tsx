import React, { forwardRef, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { LoadingIcon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdButtonProps } from './type';
import noop from '../_util/noop';
import { buttonDefaultProps } from './defaultProps';
import { useHover } from './useHover';
import { mergeRefs } from './mergeRefs';

export interface ButtonProps extends TdButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef((props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const {
    className = '',
    style,
    block,
    children,
    content = '',
    disabled,
    ghost,
    icon = null,
    loading,
    shape,
    size,
    theme,
    type,
    variant,
    onClick = noop,
    suffix,
  } = props;
  const { classPrefix } = useConfig();

  const clsName = useMemo(() => `${classPrefix}-button`, [classPrefix]);

  const innerRef = React.createRef<HTMLButtonElement>();

  const composeRefs = mergeRefs([ref, innerRef]);
  const [isHovering] = useHover(innerRef, true);

  const cls = classnames([
    clsName,
    `${clsName}--size--${size}`,
    `${clsName}--${variant}`,
    {
      [`${clsName}--${theme}`]: theme,
      [`${clsName}--${shape}`]: shape,
      [`${clsName}--ghost`]: ghost,
      [`${clsName}--block`]: block,
      [`${clsName}--disabled`]: disabled,
      [`${clsName}--loading`]: loading,
      [`${clsName}--hover`]: isHovering,
    },
    className,
  ]);

  const handleClick = useCallback(
    (e: any) => {
      if (!loading && !disabled) {
        onClick(e);
      } else {
        e.stopPropagation();
      }
    },
    [loading, disabled, onClick],
  );

  // todo: form context disable share control

  return (
    <button
      role="button"
      ref={composeRefs}
      type={type}
      className={cls}
      style={style}
      onClick={handleClick}
      disabled={disabled}
    >
      {loading ? <LoadingIcon /> : icon}
      {content || children ? <span className={`${classPrefix}__content`}> {content || children}</span> : null}
      {suffix || null}
    </button>
  );
});

Button.displayName = 'Button';
Button.defaultProps = buttonDefaultProps;

export default Button;
