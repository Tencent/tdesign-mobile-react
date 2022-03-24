import React, { useEffect, useState } from 'react';
import { noop } from 'lodash';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdCheckTagProps } from './type';

export interface TagCheckProps extends TdCheckTagProps {
  className?: string;
  style?: object;
}

const TagCheck: React.FC<TagCheckProps> = React.memo((props) => {
  const {
    checked = undefined,
    defaultChecked = undefined,
    content = '',
    children,
    style = {},
    className = '',
    icon = '',
    disabled = false,
    closable = false,
    size = 'medium',
    shape = 'square',
    onClick = noop,
    onChange = noop,
    ...other
  } = props;

  const { classPrefix } = useConfig();

  const [active, setActive] = useState(checked || defaultChecked || false);

  const baseClass = `${classPrefix}-tag`;

  const checkTagClass = classNames(
    `${baseClass}`,
    `${baseClass}--checkable`,
    `${baseClass}--${shape}`,
    `${baseClass}--size-${size}`,
    {
      [`${classPrefix}-is-closable ${baseClass}--closable`]: closable,
      [`${classPrefix}-is-disabled ${baseClass}--disabled`]: disabled,
      [`${classPrefix}-is-checked ${baseClass}--checked`]: active,
    },
    className,
  );

  const tagStyle = {
    ...style,
  };

  const handleClick = (e) => {
    if (disabled || closable) {
      return;
    }
    if (checked !== undefined) {
      // 受控
      onChange(!active);
    } else {
      // 非受控
      onChange(!active);
      setActive(!active);
    }
    onClick({ e });
  };

  const handleClose = (e) => {
    if (disabled) {
      return;
    }
    e.stopPropagation();
    onClick({ e });
  };

  useEffect(() => {
    if (checked !== undefined) {
      setActive(!!checked);
    } else {
      setActive(!!defaultChecked);
    }
  }, [checked, defaultChecked]);

  return (
    <button className={checkTagClass} style={tagStyle} onClick={handleClick} disabled={disabled} {...other}>
      <span className={`${baseClass}__icon`}>{icon}</span>
      <span className={`${baseClass}__text`}>{content || children}</span>
      {closable ? <Icon name="close" className={`${baseClass}__close`} onClick={handleClose} /> : null}
    </button>
  );
});

export default TagCheck;
