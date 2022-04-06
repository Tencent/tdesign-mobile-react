import React, { FC, useEffect, useState } from 'react';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import classNames from 'classnames';
import isFunction from 'lodash/isFunction';
import { TdStepperProps } from './type';

const Stepper: FC<TdStepperProps> = (prop) => {
  const {
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
    if (type === 'minus' && currentValue <= min) {
      return true;
    }
    if (type === 'plus' && currentValue >= max) {
      return true;
    }
    return false;
  };

  const formatValue = (value) => Math.max(Math.min(max, value, Number.MAX_SAFE_INTEGER), min, Number.MIN_SAFE_INTEGER);

  const updateValue = (value) => {
    setCurrentValue(formatValue(value));
    onChange && onChange(value);
  };

  const minusValue = () => {
    if (isDisabled('minus') && onOverlimit) {
      onOverlimit('minus');
      return;
    }
    updateValue(currentValue - step);
  };

  const plusValue = () => {
    if (isDisabled('plus') && onOverlimit) {
      onOverlimit('plus');
      return;
    }
    updateValue(currentValue + step);
  };

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    if (isNaN(value)) return;
    setCurrentValue(formatValue(value));
    // onChange && onChange(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    setCurrentValue(formatValue(value));
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
    <div className={classNames(name, `${name}__${theme === 'grey' ? 'pure' : 'normal'}`)}>
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
      />
      <div
        className={classNames(`${name}__plus`, `${currentValue >= max ? `${classPrefix}-is-disabled` : ''}`)}
        onClick={plusValue}
      />
    </div>
  );
};
export default Stepper;
