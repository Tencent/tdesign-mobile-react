import React, { FC, forwardRef, useRef } from 'react';
import { CloseCircleFilledIcon } from 'tdesign-icons-react';
import isFunction from 'lodash/isFunction';
import classNames from 'classnames';
import { getCharacterLength } from '@common/js/utils/helper';
import { TdInputProps } from './type';
import useConfig from '../_util/useConfig';

export interface InputProps extends TdInputProps {
  required?: boolean;
  readonly?: boolean;
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
    vertical = false,
    name = '',
    placeholder = '',
    prefixIcon,
    // size = 'small',
    suffix,
    suffixIcon,
    type = 'text',
    value = '',
    className = '',
    defaultValue,
    required = false,
    readonly = false,
    onBlur,
    onChange,
    onClear,
    onEnter,
    onFocus,
  } = props;

  const { classPrefix } = useConfig();
  const prefix = classPrefix;

  const compositionRef = useRef(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.CompositionEvent<HTMLInputElement>) {
    let { value } = e.currentTarget;
    if (maxcharacter !== 0 && !compositionRef.current) {
      const res = getCharacterLength(value, maxcharacter) as {
        length: number;
        characters: string;
      };
      value = res.characters;
    }
    isFunction(onChange) && !readonly && onChange(value, { e });
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
    isFunction(onChange) && !readonly && onChange('');
    isFunction(onClear) && onClear({ e });
  }

  const inputProps: any = {};
  if (maxlength > 0) {
    inputProps.maxLength = maxlength;
  }
  if (defaultValue !== undefined) {
    inputProps.defaultValue = defaultValue;
  }
  if (isFunction(onBlur)) {
    inputProps.onBlur = handleBlur;
  }
  if (isFunction(onEnter)) {
    inputProps.onKeyPress = handleEnter;
  }
  if (isFunction(onFocus)) {
    inputProps.onFocus = handleFocus;
  }

  return (
    <div
      className={classNames(
        [`${prefix}-cell`],
        [`${prefix}-cell--middle`],
        [`${prefix}-cell--bordered ${prefix}-input`],
        {
          [`${prefix}-input__error`]: errorMessage,
          [`${prefix}-input__vertical`]: vertical,
        },
        className,
      )}
    >
      <div
        className={classNames([`${prefix}-input__left`], {
          [`${prefix}-input__vertical__left`]: vertical,
        })}
      >
        <div className={classNames({ [`${prefix}-cell__left-icon`]: prefixIcon })}>
          {prefixIcon ? prefixIcon : <></>}
        </div>
        {label && (
          <div className={`${prefix}-cell__title`}>
            <div className={`${prefix}-input--label`}>{label}</div>
            {required && <span className={`${prefix}-cell--required`}>&nbsp;*</span>}
          </div>
        )}
      </div>
      <div
        className={classNames([`${prefix}-input__right`], {
          [`${prefix}-input__vertical__right`]: vertical,
        })}
      >
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
              onChange={handleChange}
              onCompositionStart={() => {
                compositionRef.current = true;
              }}
              onCompositionEnd={(e) => {
                compositionRef.current = false;
                handleChange(e);
              }}
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
        <div className={classNames({ [`${prefix}-cell__right-icon`]: suffixIcon })}>
          {suffixIcon ? suffixIcon : <></>}
        </div>
      </div>
    </div>
  );
});

export default Input;
