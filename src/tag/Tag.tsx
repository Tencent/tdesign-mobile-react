import React, { useCallback, forwardRef } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import { noop } from 'lodash';
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
    maxWidth = '',
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
    `${baseClass}-${theme}`,
    `${baseClass}--${shape}`,
    `${baseClass}-${variant}`,
    `${baseClass}--size-${size}`,
    {
      [`${classPrefix}-is-error`]: theme === 'danger',
      [`${classPrefix}-is-success`]: theme === 'success',
      [`${classPrefix}-is-warning`]: theme === 'warning',
      [`${classPrefix}-is-closable ${baseClass}--closable`]: closable,
      [`${classPrefix}-is-disabled ${baseClass}--disabled`]: disabled,
    },
    className,
  );

  const tagStyle = {
    ...style,
    maxWidth,
  };

  const getRenderContent = useCallback(() => {
    const contentType = typeof content;
    if (contentType === 'string' || contentType === 'number') {
      return content;
    }
    // if (contentType === 'function') {
    //   return content();
    // }

    return content;
  }, [content]);

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
    <div className={tagClassNames} style={tagStyle} onClick={handleClick} ref={ref} {...other}>
      <span className={`${baseClass}__icon`}>{icon}</span>
      <span className={`${baseClass}__text`}>{getRenderContent() || children}</span>
      {closable ? <Icon name="close" className={`${baseClass}__close`} onClick={onClickClose} /> : null}
    </div>
  );
});

export default React.memo(Tag);
