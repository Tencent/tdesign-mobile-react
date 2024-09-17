import React, { forwardRef, memo } from 'react';
import classNames from 'classnames';
import { AddIcon, RemoveIcon } from 'tdesign-icons-react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import { formatNumber } from 'tdesign-mobile-react/_util/formatNumber';
import useConfig from '../_util/useConfig';
import { TdStepperProps } from './type';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { stepperDefaultProps } from './defaultProps';

export interface StepperProps extends TdStepperProps, NativeProps {}

const Stepper = forwardRef<HTMLDivElement, StepperProps>((originProps, ref) => {
  const props = useDefaultProps(originProps, stepperDefaultProps);
  const {
    className,
    style,
    disableInput,
    disabled,
    inputWidth,
    integer,
    max,
    size,
    min,
    step,
    theme,
    value,
    defaultValue,
    onBlur,
    onChange,
    onFocus,
    onOverlimit,
    ...otherProps
  } = props;

  const [currentValue, setCurrentValue] = useDefault(value, defaultValue, onChange);
  const { classPrefix } = useConfig();
  const baseClass = `${classPrefix}-stepper`;
  const inputStyle = inputWidth ? { width: `${props.inputWidth}px` } : {};

  const isDisabled = (type: 'minus' | 'plus') => {
    if (disabled) return true;
    if (type === 'minus' && Number(currentValue) <= min) {
      return true;
    }
    if (type === 'plus' && Number(currentValue) >= max) {
      return true;
    }
    return false;
  };

  const getLen = (num: number) => {
    const numStr = num.toString();
    return numStr.indexOf('.') === -1 ? 0 : numStr.split('.')[1].length;
  };

  /**
   * 精确加法
   */
  const add = (a: number, b: number) => {
    const maxLen = Math.max(getLen(a), getLen(b));
    const base = 10 ** maxLen;
    return Math.round(a * base + b * base) / base;
  };

  const formatValue = (value: number) =>
    Math.max(Math.min(max, value, Number.MAX_SAFE_INTEGER), min, Number.MIN_SAFE_INTEGER).toFixed(
      Math.max(getLen(step), getLen(value)),
    );

  const updateValue = (value: TdStepperProps['value']) => {
    setCurrentValue(formatNumber(`${value}`, !integer));
  };

  const plusValue = () => {
    if (isDisabled('plus')) {
      onOverlimit?.('plus');
      return;
    }
    updateValue(formatValue(add(Number(currentValue), step)));
  };

  const minusValue = () => {
    if (isDisabled('minus')) {
      onOverlimit?.('minus');
      return;
    }
    updateValue(formatValue(add(Number(currentValue), -step)));
  };

  const handleInput = (e: Event) => {
    const value = formatNumber((e.target as HTMLTextAreaElement).value, !integer);
    setCurrentValue(value);
  };

  const handleChange = () => {
    const formattedValue = formatValue(Number(currentValue));
    updateValue(formattedValue);
  };

  const handleFocus = () => {
    onFocus(Number(currentValue));
  };

  const handleBlur = () => {
    onBlur(Number(currentValue));
  };

  return withNativeProps(
    props,
    <div className={classNames(baseClass, `${baseClass}--${size}`, className)} style={style} {...otherProps} ref={ref}>
      <div
        className={classNames(`${baseClass}__minus`, `${baseClass}__minus--${theme}`, `${baseClass}__icon--${size}`, {
          [`${baseClass}--${theme}-disabled`]: disabled || Number(currentValue) <= props.min,
        })}
        onClick={minusValue}
      >
        <RemoveIcon className={`${currentValue}__minus-icon`} />
      </div>
      <input
        value={currentValue}
        className={classNames(`${baseClass}__input`, `${baseClass}__input--${theme}`, `${baseClass}__input--${size}`, {
          [`${baseClass}--${theme}-disabled`]: disabled,
        })}
        type={integer ? 'tel' : 'text'}
        inputMode={integer ? 'numeric' : 'decimal'}
        style={inputStyle}
        disabled={disableInput || disabled}
        readOnly={disableInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        onChange={handleChange}
      />
      <div
        className={classNames(`${baseClass}__plus`, `${baseClass}__plus--${theme}`, `${baseClass}__icon--${size}`, {
          [`${baseClass}--${theme}-disabled`]: disabled || Number(currentValue) >= max,
        })}
        onClick={plusValue}
      >
        <AddIcon className={`${currentValue}__plus-icon`} />
      </div>
    </div>,
  );
});

Stepper.defaultProps = stepperDefaultProps as StepperProps;
Stepper.displayName = 'Stepper';

export default memo(Stepper);
