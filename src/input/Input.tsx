import React, { FC, forwardRef } from 'react';
import { CloseCircleFilledIcon } from 'tdesign-icons-react';
import { isFunction } from 'lodash';
import { TdInputProps } from './type';
import { getCharacterLength } from '../_util/helper';

const prefix = 't';

export interface InputProps extends TdInputProps {
  defaultValue: string;
}

const Input: FC<InputProps> = forwardRef((props, ref) => {
  const {
    align = 'left',
    autofocus = false,
    clearable = false,
    disabled = false,
    errorMessage = '',
    label = '',
    maxcharacter = 0, // 半成品
    maxlength = 0,
    name = '',
    placeholder,
    prefixIcon,
    // size = 'small',
    suffix,
    suffixIcon,
    type = 'text',
    value,
    defaultValue,
    onBlur,
    onChange,
    onClear,
    onEnter,
    onFocus,
  } = props;

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.CompositionEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    if (maxcharacter !== 0) {
      getCharacterLength(value, maxcharacter);
    }
    isFunction(onChange) && onChange(value, { e });
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    const { value } = e.currentTarget;
    isFunction(onBlur) && onBlur(value, { e });
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13 || e.key === 'Enter' || e.charCode === 13 || e.which === 13) {
      const { value } = e.currentTarget;
      isFunction(onEnter) && onEnter(value, { e });
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    const { value } = e.currentTarget;
    isFunction(onFocus) && onFocus(value, { e });
  }

  function handleClear(e: React.MouseEvent<SVGElement, MouseEvent>) {
    isFunction(onChange) && onChange('');
    isFunction(onClear) && onClear({ e });
  }

  const inputProps: any = {};
  if (maxlength > 0) {
    inputProps.maxLength = maxlength;
  }
  if (defaultValue !== undefined) {
    inputProps.defaultValue = defaultValue;
  }

  return (
    <div
      className={`${prefix}-cell ${prefix}-cell--middle ${prefix}-cell--bordered ${prefix}-input ${
        errorMessage ? `${prefix}-input__error` : ''
      }`}
    >
      <div className={`${prefix}-cell__left-icon`}>{prefixIcon ? prefixIcon : <></>}</div>
      {label && (
        <div className={`${prefix}-cell__title`}>
          <div className={`${prefix}-input--label`}>{label}</div>
          <span className={`${prefix}-cell--required`}>&nbsp;*</span>
        </div>
      )}
      <div className={`${prefix}-cell__note`}>
        <div className={`${prefix}-input__wrap`}>
          <input
            style={{ textAlign: align }}
            autoFocus={autofocus}
            disabled={disabled}
            name={name}
            type={type}
            className={`${prefix}-input__control`}
            autoComplete="off"
            placeholder={placeholder}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyPress={handleEnter}
            onFocus={handleFocus}
            ref={ref}
            {...inputProps}
          />
          {clearable && (
            <div className={`${prefix}-input__wrap--icon`}>
              <CloseCircleFilledIcon onClick={handleClear} />
            </div>
          )}
          {suffix && <div className={`${prefix}-input__wrap--suffix`}>{suffix}</div>}
        </div>
        {errorMessage && <div className={`${prefix}-input__error-msg`}>{errorMessage}</div>}
      </div>
      <div className={`${prefix}-cell__right-icon`}>{suffixIcon ? suffixIcon : <></>}</div>
    </div>
  );
});
export default Input;
