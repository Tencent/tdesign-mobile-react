import React, { FC, useEffect, useState } from 'react';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import { TdStepperProps } from './type';

const Stepper: FC<TdStepperProps> = (prop) => {
  const {
    disabled,
    disableInput,
    inputWidth,
    max = 999,
    min = 0,
    step = 1,
    theme,
    value,
    defaultValue = 0,
    onBlur,
    onChange,
    onOverlimit,
  } = prop;
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
    onChange && onChange(value);
  };

  const minusValue = () => {
    if (isDisabled('minus')) {
      isFunction(onOverlimit) && onOverlimit('minus');
      return;
    }
    updateValue(currentValue - step);
  };

  const plusValue = () => {
    if (isDisabled('plus')) {
      isFunction(onOverlimit) && onOverlimit('plus');
      return;
    }
    updateValue(currentValue + step);
  };

  const handleChange = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    if (isNaN(Number(value))) return;
    setCurrentValue(formatValue(Number(value)));
    isFunction(onChange) && onChange(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    if (isNaN(Number(value))) return;
    setCurrentValue(formatValue(Number(value)));
    isFunction(onBlur) && onBlur(value);
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
      className={classNames(
        name,
        `${name}__${theme === 'grey' ? 'pure' : 'normal'}`,
        `${disabled ? `${classPrefix}-is-disabled` : ''}`,
      )}
    >
      <div
        className={classNames(`${name}__minus`, `${currentValue <= min ? `${classPrefix}-is-disabled` : ''}`)}
        onClick={minusValue}
      />
      <input
        className={`${name}__input`}
        style={{ width: `${inputWidth || 100}rpx` }}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled || disableInput}
      />
      <div
        className={classNames(`${name}__plus`, `${currentValue >= max ? `${classPrefix}-is-disabled` : ''}`)}
        onClick={plusValue}
      />
    </div>
  );
};

export default Stepper;
