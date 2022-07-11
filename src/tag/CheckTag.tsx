import React, { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdCheckTagProps } from './type';
import useDefault from '../_util/useDefault';
import noop from '../_util/noop';

export interface TagCheckProps extends TdCheckTagProps {
  className?: string;
  style?: object;
}

const TagCheck: React.FC<TagCheckProps> = React.memo(
  forwardRef((props, ref: Ref<HTMLButtonElement>) => {
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

    const [innerChecked, onInnerChecked] = useDefault(checked, defaultChecked, onChange);

    const baseClass = `${classPrefix}-tag`;

    const checkTagClass = classNames(
      `${baseClass}`,
      `${baseClass}--checkable`,
      `${baseClass}--shape-${shape}`,
      `${baseClass}--size-${size}`,
      {
        [`${classPrefix}-is-closable ${baseClass}--closable`]: closable,
        [`${classPrefix}-is-disabled ${baseClass}--disabled`]: disabled,
        [`${classPrefix}-is-checked ${baseClass}--checked`]: innerChecked,
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
      onInnerChecked(!innerChecked);
      onClick({ e });
    };

    const handleClose = (e) => {
      if (disabled) {
        return;
      }
      e.stopPropagation();
      onClick({ e });
    };

    return (
      <span className={checkTagClass} style={tagStyle} onClick={handleClick} ref={ref} {...other}>
        <span className={`${baseClass}__icon`}>{icon}</span>
        <span className={`${baseClass}__text`}>{content || children}</span>
        {closable ? (
          <span className={`${baseClass}__icon-close`} onClick={handleClose}>
            <Icon name="close" />
          </span>
        ) : null}
      </span>
    );
  }),
);

export default TagCheck;
