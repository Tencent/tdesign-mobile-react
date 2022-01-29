import React, { useState, Ref } from 'react';
import classNames from 'classnames';
import { CheckCircleFilledIcon, CircleIcon, MinusCircleFilledIcon } from 'tdesign-icons-react';
import { TdCheckboxProps } from './type';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import CheckboxGroup from './CheckboxGroup';
import useConfig from '../_util/useConfig';

export interface CheckProps extends TdCheckboxProps {
  ref: Ref<HTMLLabelElement>;
}

/**
 * Check 组件支持使用 CheckContext 进行状态托管
 */
export const CheckContext = React.createContext<CheckContextValue>(null);

/**
 * 托管 Check 组件的状态，请提供 inject() 方法注入托管好的 props
 */
export interface CheckContextValue {
  inject: (props: CheckProps) => CheckProps;
}

const Check: React.FC<CheckProps> = (checkboxProps) => {
  const { classPrefix } = useConfig();
  const { checked: defaultChecked, name } = checkboxProps;
  const { align, content, children, disabled, indeterminate, label } = checkboxProps;

  const [checked, setChecked] = useState<boolean>(!!defaultChecked);
  const checkBoxChange = function (e) {
    const { checked } = e.target;
    setChecked(!!checked);
  }

  const renderCheckIcon = () => {
    if (indeterminate) {
      if (checked) {
        return <MinusCircleFilledIcon className={classNames({ [`${classPrefix}-checkbox__checked__disable-icon`]: disabled })} />;
      }
      return <MinusCircleFilledIcon className={`${classPrefix}-checkbox__checked__disable-icon`} />;
    }
    if (checked) {
      return <CheckCircleFilledIcon className={classNames({ [`${classPrefix}-checkbox__checked__disable-icon`]: disabled })} />;
    }
    return <CircleIcon className={`${classPrefix}-checkbox__checked__disable-icon`} />;
  }
  const reverseFlag = align === 'right';
  const reverseOrder = (c1: React.ReactElement, c2: React.ReactElement) => {
    const renderList = [c1, c2];
    if (reverseFlag) {
      renderList.reverse();
    }
    return renderList;
  };
  const iconClassName = classNames(
    { [`${classPrefix}-cell__left-icon`]: !reverseFlag },
    { [`${classPrefix}-cell__right-icon`]: reverseFlag },
    `${classPrefix}-checkbox__wrap`,
  );
  return (
    <div className={`${classPrefix}-cell ${classPrefix}-cell--middle ${classPrefix}-cell--bordered`}>
      {reverseOrder(
        <div className={`${classPrefix}-cell__title`}>
          <span>{label}</span>
          <div className={`${classPrefix}-cell__description`}>{children || content}</div>
        </div>,
        <div className={iconClassName}>
          <div className={`${classPrefix}-checkbox`}>
            <div className={`${classPrefix}-checkbox__content-wrap`}>
              <span className={`${classPrefix}-checkbox__icon-left ${classPrefix}-is-checked ${classPrefix}-is-disabled`}>
                <input type="checkbox" name={name} className={`${classPrefix}-checkbox__original-left`} disabled={disabled} checked={checked} onChange={checkBoxChange} />
                {renderCheckIcon()}
              </span>
              <span className={`${classPrefix}-checkbox__label-wrap`}></span>
            </div>
          </div>
        </div>)}
    </div>
  );
};

const Checkbox = forwardRefWithStatics(
  (props: TdCheckboxProps, ref: Ref<HTMLLabelElement>) => <Check ref={ref} {...props} />,
  { Group: CheckboxGroup },
);

export default Checkbox;
