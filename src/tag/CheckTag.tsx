import React, { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdCheckTagProps } from './type';
import useDefault from '../_util/useDefault';
import noop from '../_util/noop';

export interface TagCheckProps extends TdCheckTagProps {
  className?: string;
  style?: object;
  /**
   * 标签风格变体
   * @default dark
   */
  variant?: 'dark' | 'light' | 'outline' | 'light-outline';
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
      size = 'medium',
      shape = 'square',
      onClick = noop,
      onChange = noop,
      variant = 'dark',
      ...other
    } = props;

    const { classPrefix } = useConfig();

    const [innerChecked, onInnerChecked] = useDefault(checked, defaultChecked, onChange);

    const baseClass = `${classPrefix}-tag`;

    const contentIsArray = Array.isArray(content) && content.length === 2;

    const checkTagClass = classNames(
      `${baseClass}`,
      `${baseClass}--checkable`,
      `${baseClass}--${shape}`,
      `${baseClass}--${innerChecked ? 'primary' : 'default'}`,
      `${baseClass}--${size}`,
      `${baseClass}--${variant}`,
      {
        [`${classPrefix}-is-disabled ${baseClass}--disabled`]: disabled,
        [`${classPrefix}-is-checked ${baseClass}--checked`]: !disabled && innerChecked,
      },
      className,
    );

    const tagStyle = {
      ...style,
    };

    const handleClick = (e) => {
      if (!disabled) {
        onClick({ e });
        onInnerChecked(!innerChecked);
      }
    };

    const renderContent = () => {
      if (contentIsArray && content) {
        return contentIsArray ? content[0] : content[1];
      }

      return content || children;
    };

    return (
      <span
        className={checkTagClass}
        style={tagStyle}
        onClick={handleClick}
        ref={ref}
        {...other}
        aria-disabled={disabled}
        role="button"
      >
        <span className={`${baseClass}__icon`}>{icon}</span>
        <span className={`${baseClass}__text`}>{renderContent()}</span>
      </span>
    );
  }),
);

export default TagCheck;
