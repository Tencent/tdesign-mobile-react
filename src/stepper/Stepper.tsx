import React, { FC } from 'react';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import classNames from 'classnames';
import identity from 'lodash/identity';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import { TdStepperProps } from './type';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';

export interface StepperProps extends TdStepperProps, NativeProps {}

const defaultProps = {
  disabled: false,
  disableInput: false,
  max: 100,
  min: 0,
  step: 1,
  theme: 'normal',
  defaultValue: 0,
  onBlur: identity,
  onChange: identity,
  onOverlimit: identity,
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    disabled,
    disableInput,
    inputWidth,
    max,
    min,
    step,
    theme,
    value,
    defaultValue,
    onBlur,
    onChange,
    onOverlimit,
  } = props;
  const [currentValue, setCurrentValue] = useDefault(value, defaultValue, onChange);
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-stepper`;

  const isDisabled = (type: 'minus' | 'plus') => {
    if (disabled) return true;
    if (type === 'minus' && currentValue <= min) {
      return true;
    }
    if (type === 'plus' && currentValue >= max) {
      return true;
    }
    return false;
  };

  const formatValue = (value: number) =>
    Math.max(Math.min(max, value, Number.MAX_SAFE_INTEGER), min, Number.MIN_SAFE_INTEGER);

  const updateValue = (value: number) => {
    setCurrentValue(formatValue(value));
    onChange(value);
  };

  const minusValue = () => {
    if (isDisabled('minus')) {
      onOverlimit('minus');
      return;
    }
    updateValue(Number(currentValue) - step);
  };

  const plusValue = () => {
    if (isDisabled('plus')) {
      onOverlimit('plus');
      return;
    }
    updateValue(Number(currentValue) + step);
  };

  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    if (isNaN(Number(value))) return;
    const formattedValue = formatValue(Number(value));
    setCurrentValue(formattedValue);
    onChange(formattedValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    if (isNaN(Number(value))) return;
    const formattedValue = formatValue(Number(value));
    setCurrentValue(formattedValue);
    onBlur(formattedValue);
  };

  return withNativeProps(
    props,
    <div
      className={classNames(name, {
        [`${classPrefix}-is-disabled`]: disabled,
        [`${name}__pure`]: theme === 'grey',
        [`${name}__normal`]: theme !== 'grey',
      })}
    >
      <div
        className={classNames(`${name}__minus`, {
          [`${classPrefix}-is-disabled`]: currentValue <= min,
        })}
        onClick={minusValue}
      />
      <input
        className={`${name}__input`}
        style={{ width: inputWidth || 50 }}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled || disableInput}
      />
      <div
        className={classNames(`${name}__plus`, {
          [`${classPrefix}-is-disabled`]: currentValue >= max,
        })}
        onClick={plusValue}
      />
    </div>,
  );
};

Stepper.defaultProps = defaultProps as StepperProps;
Stepper.displayName = 'Stepper';

export default Stepper;
