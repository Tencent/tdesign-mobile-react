import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import noop from '../_util/noop';
import { TdTagProps } from './type';
import useConfig from '../_util/useConfig';

export interface TagProps extends TdTagProps {
  className: string;
  style: object;
}

const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const {
    className = '',
    style = {},
    closable = false,
    content = null,
    disabled = false,
    icon = undefined,
    maxWidth,
    children = '',
    shape = 'square',
    size = 'medium',
    theme = 'default',
    variant = 'dark',
    onClick = noop,
    onClose = noop,
    ...other
  } = props;

  const { classPrefix } = useConfig();
  const baseClass = `${classPrefix}-tag`;

  const tagClassNames = classNames(
    `${baseClass}`,
    `${baseClass}--${theme}`,
    `${baseClass}--${shape}`,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    {
      [`${classPrefix}-is-closable ${baseClass}--closable`]: closable,
      [`${classPrefix}-is-disabled ${baseClass}--disabled`]: disabled,
    },
    className,
  );

  const tagStyle = maxWidth
    ? {
        ...style,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      }
    : {};

  function onClickClose(e) {
    if (disabled) {
      return;
    }
    e.stopPropagation();
    onClose({ e });
  }

  const handleClick = (e) => {
    if (disabled) {
      return;
    }
    onClick({ e });
  };

  return (
    <span
      className={tagClassNames}
      style={tagStyle}
      onClick={handleClick}
      aria-disabled={disabled}
      role="button"
      ref={ref}
      {...other}
    >
      <span className={`${baseClass}__icon`}>{icon}</span>
      <span className={`${baseClass}__text`}>{content || children}</span>
      {closable ? (
        <span className={`${baseClass}__icon-close`} onClick={onClickClose}>
          <Icon name="close" />
        </span>
      ) : null}
    </span>
  );
});

export default React.memo(Tag);
