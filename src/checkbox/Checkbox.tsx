import React, { useContext, Ref, forwardRef } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import { TdCheckboxProps } from './type';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import CheckboxGroup from './CheckboxGroup';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { checkboxDefaultProps } from './defaultProps';

export interface CheckBoxProps extends TdCheckboxProps {
  ref: Ref<HTMLLabelElement>;
}

export interface CheckContextValue {
  inject: (props: CheckBoxProps) => CheckBoxProps;
}

export const CheckContext = React.createContext<CheckContextValue>(null);

const Checkbox = forwardRef((_props: CheckBoxProps) => {
  const context = useContext(CheckContext);
  const props = context ? context.inject(_props) : _props;
  const { classPrefix: prefix } = useConfig();
  const {
    name,
    placement,
    content,
    disabled,
    indeterminate,
    label,
    onChange,
    checked,
    defaultChecked,
    maxLabelRow,
    maxContentRow,
    icon,
    block,
    borderless,
  } = useDefaultProps(props, checkboxDefaultProps);
  const [internalChecked, setInternalChecked] = useDefault<Boolean, any[]>(checked, defaultChecked, onChange);

  const classPrefix = `${prefix}-checkbox`;

  const checkboxClassName = classNames(`${classPrefix}`, {
    [`${classPrefix}--checked`]: internalChecked,
    [`${classPrefix}--block`]: block,
    [`${classPrefix}--${placement}`]: true,
  });

  const isIconArray = Array.isArray(icon);
  const defaultCheckIcons = [<Icon key={0} name="check-circle-filled"></Icon>, <Icon key={1} name="circle"></Icon>];
  const checkIcons = () => {
    if (isIconArray && icon.length > 1) {
      return icon.map((icon) =>
        typeof icon === 'string' ? <img key={icon} src={icon} className={`${name}__icon-image`} alt="" /> : icon,
      );
    }
    return defaultCheckIcons;
  };

  const checkedIcon = () => {
    if (icon === 'circle' || props.icon === true) return indeterminate ? 'minus-circle-filled' : 'check-circle-filled';
    if (icon === 'rectangle') return indeterminate ? 'minus-rectangle-filled' : 'check-rectangle-filled';
    if (icon === 'line') return indeterminate ? 'minus' : 'check';
  };

  const renderIcon = () => {
    if (!icon) {
      return null;
    }
    const renderIconCircle = () => {
      const iconCircleClass = `${classPrefix}__icon-circle`;
      const iconStringClass = `${classPrefix}__icon-${icon}`;
      const iconDisabledClass = `${classPrefix}__icon-${icon}--disabled`;

      return (
        <div
          className={classNames({
            [iconCircleClass]: icon === true,
            [iconStringClass]: typeof icon === 'string',
            [iconDisabledClass]: disabled,
          })}
        />
      );
    };

    const renderCheckedIcon = () => <Icon name={checkedIcon()} className={`${classPrefix}__icon-wrapper`} />;

    const renderLinePlaceholder = () => <div className="placeholder"></div>;

    const renderIcon = () => {
      if (Array.isArray(icon)) {
        return checkIcons()[internalChecked ? 0 : 1];
      }

      if (internalChecked) {
        return renderCheckedIcon();
      }

      if (icon === 'circle' || icon === true || icon === 'rectangle') {
        return renderIconCircle();
      }

      if (icon === 'line') {
        return renderLinePlaceholder();
      }

      return null;
    };
    return (
      <div
        className={classNames(`${classPrefix}__icon ${classPrefix}__icon--${placement}`, {
          [`${classPrefix}__icon--checked`]: internalChecked,
          [`${classPrefix}__icon--disabled`]: disabled,
        })}
      >
        {renderIcon()}
      </div>
    );
  };
  const handleChange = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (disabled) {
      return;
    }
    setInternalChecked(!internalChecked, { e });
    e.stopPropagation();
  };
  const renderCheckBoxContent = () => (
    <div
      className={`${classPrefix}__content`}
      onClick={(event) => {
        event.stopPropagation();
        handleChange(event);
      }}
    >
      <div
        className={classNames(`${classPrefix}__title`, {
          [`${classPrefix}__title--checked`]: internalChecked,
          [`${classPrefix}__title--disabled`]: disabled,
        })}
        style={{ WebkitLineClamp: maxLabelRow }}
      >
        {label}
      </div>
      <div
        className={classNames(`${classPrefix}__description`, {
          [`${classPrefix}__description--disabled`]: disabled,
        })}
        style={{ WebkitLineClamp: maxContentRow }}
      >
        {content}
      </div>
    </div>
  );
  return (
    <>
      <div className={checkboxClassName} onClick={handleChange}>
        {renderIcon()}
        {renderCheckBoxContent()}
        {!borderless && <div className={`${classPrefix}__border ${classPrefix}__border--${placement}`} />}
      </div>
    </>
  );
});

export default forwardRefWithStatics(
  (props: TdCheckboxProps, ref: Ref<HTMLInputElement>) => <Checkbox ref={ref} {...props} />,
  { Group: CheckboxGroup },
);
