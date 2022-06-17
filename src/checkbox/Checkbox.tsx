import React, { useContext, useMemo, Ref, forwardRef, CSSProperties } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import { TdCheckboxProps } from './type';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import CheckboxGroup from './CheckboxGroup';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';

export interface CheckProps extends TdCheckboxProps {
  ref: Ref<HTMLLabelElement>;
}

enum ALIGN {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface CheckContextValue {
  inject: (props: CheckProps) => CheckProps;
}

export const CheckContext = React.createContext<CheckContextValue>(null);

const getLimitRowStyle = (row: number): CSSProperties => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: row,
});

const Checkbox = forwardRef((_props: CheckProps, ref: Ref<HTMLInputElement>) => {
  const context = useContext(CheckContext);
  const props = context ? context.inject(_props) : _props;
  const { classPrefix } = useConfig();
  const {
    name,
    align = 'left',
    content,
    children,
    disabled,
    indeterminate,
    label,
    onChange,
    checked,
    defaultChecked = false,
    readonly,
    value,
    maxLabelRow = 3,
    maxContentRow = 5,
    icon,
    contentDisabled,
  } = props;
  const [internalChecked, setInternalChecked] = useDefault(checked, defaultChecked, onChange);
  const containerClassName = classNames(
    `${classPrefix}-cell`,
    `${classPrefix}-cell--middle`,
    `${classPrefix}-cell--bordered`,
  );
  const alignStyle: CSSProperties = {
    flexDirection: align === ALIGN.LEFT ? 'row' : 'row-reverse',
  };
  const iconClassName = classNames(
    { [`${classPrefix}-cell__left-icon`]: align === ALIGN.LEFT },
    { [`${classPrefix}-cell__right-icon`]: align === ALIGN.RIGHT },
    `${classPrefix}-checkbox__wrap`,
  );
  const checkboxClassName = classNames(`${classPrefix}-checkbox`, {
    [`${classPrefix}-is-checked`]: internalChecked || indeterminate,
    [`${classPrefix}-is-disabled`]: disabled,
  });
  const iconName = useMemo(() => {
    if (indeterminate) {
      return 'minus-circle-filled';
    }
    if (internalChecked) {
      return 'check-circle-filled';
    }
    return 'circle';
  }, [indeterminate, internalChecked]);
  const renderIcon = () => {
    if (Array.isArray(icon)) {
      if (internalChecked) {
        return icon[0];
      }
      return icon[1];
    }
    return (
      <Icon
        name={iconName}
        className={classNames({
          [`${classPrefix}-checkbox__checked__disable-icon`]: disabled,
        })}
      />
    );
  };
  const labelStyle: CSSProperties = {
    color: disabled ? '#dcdcdc' : 'inherit',
    ...getLimitRowStyle(maxLabelRow),
  };
  const handleClick = (e) => {
    if (contentDisabled) {
      e.preventDefault();
    }
  };
  return (
    <label className={`${containerClassName}`} style={alignStyle} onClick={handleClick}>
      <div className={iconClassName}>
        <div className={checkboxClassName}>
          <div className={`${classPrefix}-checkbox__content-wrap`}>
            <span className={`${classPrefix}-checkbox__icon-left`}>
              <input
                readOnly={readonly}
                value={value}
                ref={ref}
                type="checkbox"
                name={name}
                className={`${classPrefix}-checkbox__original-left`}
                disabled={disabled}
                checked={internalChecked}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setInternalChecked(e.currentTarget.checked, { e });
                }}
              />
              {renderIcon()}
            </span>
            <span className={`${classPrefix}-checkbox__label-wrap`}></span>
          </div>
        </div>
      </div>
      <div className={`${classPrefix}-cell__title`}>
        <span style={labelStyle}>{label}</span>
        <div className={`${classPrefix}-cell__description`} style={getLimitRowStyle(maxContentRow)}>
          {children || content}
        </div>
      </div>
    </label>
  );
});

export default forwardRefWithStatics(
  (props: TdCheckboxProps, ref: Ref<HTMLInputElement>) => <Checkbox ref={ref} {...props} />,
  { Group: CheckboxGroup },
);
