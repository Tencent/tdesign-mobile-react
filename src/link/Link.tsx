import React from 'react';
import type { FC } from 'react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import cls from 'classnames';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import { TdLinkProps } from './type';

export const defaultProps: TdLinkProps = {
  href: '',
  size: 'medium',
  target: '',
  theme: 'default',
};

export interface LinkProps extends TdLinkProps {
  children: React.ReactNode;
}

const Link: FC<LinkProps> = (props) => {
  const {
    content,
    onClick,
    target,
    prefixIcon,
    children,
    suffixIcon,
    theme,
    size,
    disabled,
    underline,
    hover,
    href,
    ...rest
  } = useDefaultProps(props, defaultProps);

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-link`;
  const renderLinkContent = () => content || children;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (disabled) return;
    onClick && onClick(e);
  }

  const linkClass = cls([
    name,
    `${name}--${theme}`,
    `${name}--${size}`,
    {
      [`${classPrefix}--disabled`]: disabled,
      [`${classPrefix}--underline`]: underline,
      [`${classPrefix}--hover`]: hover && !disabled,
    },
  ]);

  const prefixIconCls = cls([`${name}__prefix-icon`, `${name}-class-prefix-icon`]);

  const suffixIconCls = cls([`${name}__suffix-icon`, `${name}-class-suffix-icon`]);

  return (
    <a
      href={disabled || !href ? undefined : href}
      target={target}
      className={linkClass}
      aria-disable={disabled}
      onClick={handleClick}
      {...rest}
    >
      {prefixIcon ? <span className={prefixIconCls}>{prefixIcon}</span> : null}
      <span className={`${name}__content`}>{renderLinkContent()}</span>
      {suffixIcon ? <span className={suffixIconCls}>{suffixIcon}</span> : null}
    </a>
  );
};

export default Link;
