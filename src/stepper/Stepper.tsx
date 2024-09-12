import React, { FC } from 'react';
import classNames from 'classnames';
import { AddIcon, RemoveIcon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { TdStepperProps } from './type';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import { stepperDefaultProps } from './defaultProps';

export interface StepperProps extends TdStepperProps, NativeProps {}

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
    size,
    integer,
    defaultValue,
    onBlur,
    onFocus,
    onChange,
    onOverlimit,
  } = useDefaultProps(props, stepperDefaultProps);
  const [currentValue, setCurrentValue] = useDefault(value, defaultValue, onChange);
  const { classPrefix } = useConfig();
  const stepperClass = usePrefixClass('stepper');

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
    onChange?.(formattedValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    if (isNaN(Number(value))) return;
    const formattedValue = formatValue(Number(value));
    setCurrentValue(formattedValue);
    onBlur?.(formattedValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.currentTarget;
    if (isNaN(Number(value))) return;
    const formattedValue = formatValue(Number(value));
    setCurrentValue(formattedValue);
    onFocus?.(formattedValue);
  };

  return withNativeProps(
    props,
    <div className={classNames(`${stepperClass}`, `${classPrefix}--${size}`)}>
      <div
        className={classNames(
          `${stepperClass}__minus`,
          `${stepperClass}__minus--${theme}`,
          `${stepperClass}__icon--${size}`,
          {
            [`${stepperClass}--${theme}-disabled`]: disabled || Number(currentValue) <= min,
          },
        )}
        onClick={minusValue}
      >
        <RemoveIcon className={`${stepperClass}__minus-icon`} />
      </div>
      <input
        className={classNames(
          `${stepperClass}__input`,
          `${stepperClass}__input--${theme}`,
          `${stepperClass}__input--${size}`,
          {
            [`${stepperClass}--${theme}-disabled`]: disabled,
          },
        )}
        type={integer ? 'tel' : 'text'}
        inputMode={integer ? 'numeric' : 'decimal'}
        style={{
          width: inputWidth ? `${inputWidth}px}` : '',
        }}
        disabled={disableInput || disabled}
        readOnly={disableInput}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <div
        className={classNames(
          `${stepperClass}__plus`,
          `${stepperClass}__plus--${theme}`,
          `${stepperClass}__icon--${size}`,
          {
            [`${stepperClass}--${theme}-disabled`]: disabled || Number(currentValue) >= max,
          },
        )}
        onClick={plusValue}
      >
        <AddIcon className={`${stepperClass}__plus-icon`} />
      </div>
    </div>,
  );
};

Stepper.displayName = 'Stepper';

export default Stepper;
