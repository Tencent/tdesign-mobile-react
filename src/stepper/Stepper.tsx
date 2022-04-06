import React, { FC, useEffect, useState } from 'react';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import classNames from 'classnames';
import { TdStepperProps } from './type';
import identity from 'lodash/identity';
import type { StyledProps } from '../common';

export interface StepperProps extends TdStepperProps, StyledProps {}

const defaultProps = {
  max: 999,
  min: 0,
  step: 1,
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
  const [currentValue, setCurrentValue] = useState(0);
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-stepper`;

  const isDisabled = (type: string) => {
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
    updateValue(currentValue - step);
  };

  const plusValue = () => {
    if (isDisabled('plus')) {
      onOverlimit('plus');
      return;
    }
    updateValue(currentValue + step);
  };

  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    if (isNaN(Number(value))) return;
    setCurrentValue(formatValue(Number(value)));
    onChange(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    if (isNaN(Number(value))) return;
    setCurrentValue(formatValue(Number(value)));
    onBlur(value);
  };

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setCurrentValue(Number(value));
    } else {
      setCurrentValue(Number(defaultValue));
    }
  }, [value, defaultValue]);

  return (
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
    </div>
  );
};

Stepper.defaultProps = defaultProps;
Stepper.displayName = 'Stepper';

export default Stepper;
