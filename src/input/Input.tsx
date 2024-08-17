import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { FocusEvent, TouchEvent, CompositionEvent, FormEvent } from 'react';
import classNames from 'classnames';
import { CloseCircleFilledIcon, BrowseOffIcon, BrowseIcon } from 'tdesign-icons-react';
import useDefault from 'tdesign-mobile-react/_util/useDefault';
import parseTNode from 'tdesign-mobile-react/_util/parseTNode';
import { inputDefaultProps } from './defaultProps';
import { getCharacterLength } from '../_common/js/utils/helper';
import useConfig from '../_util/useConfig';
import useDefaultProps from '../hooks/useDefaultProps';
import { TdInputProps } from './type';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';

export interface InputProps extends TdInputProps, NativeProps {
  required?: boolean;
  readonly?: boolean;
}

export interface InputRefProps {
  focus?: () => void;
  blur?: () => void;
}

const Input = forwardRef<InputRefProps, InputProps>((props, ref) => {
  const {
    align,
    autofocus,
    autocomplete,
    borderless,
    clearable,
    clearTrigger,
    disabled,
    label,
    layout,
    maxlength,
    name,
    placeholder,
    prefixIcon,
    suffix,
    suffixIcon,
    tips,
    type,
    readonly,
    onBlur,
    onClear,
    onFocus,
    value,
    defaultValue,
    onChange,
  } = useDefaultProps(props, inputDefaultProps);

  const [showClear, setShowClear] = useState<boolean>(false);
  const [innerValue, setInnerValue] = useDefault(value, defaultValue, onChange);
  const [renderType, setRenderType] = useState(type);
  const inputRef = useRef<HTMLInputElement>(null);
  const focused = useRef<boolean>(false);
  const status = props.status || 'default';
  const { classPrefix } = useConfig();
  const rootClassName = `${classPrefix}-input`;
  const inputClasses = classNames(`${rootClassName}__control`, {
    [`${rootClassName}--${align}`]: align !== 'left',
    [`${rootClassName}--${status}`]: status,
    [`${rootClassName}__control--disabled`]: disabled,
  });
  const rootClasses = classNames(`${rootClassName}`, {
    [`${rootClassName}--layout-${layout}`]: layout,
    [`${rootClassName}--border`]: borderless,
  });
  const resultMaxLength = !isNaN(+maxlength) ? +maxlength : -1;

  useImperativeHandle(ref, () => ({
    focus,
    blur,
  }));

  useEffect(() => {
    const computeShowClear = () => {
      if (disabled || readonly) {
        return false;
      }
      if (clearable) {
        return clearTrigger === 'always' || (clearTrigger === 'focus' && focused.current);
      }
      return false;
    };
    setShowClear(computeShowClear());
  }, [clearTrigger, clearable, disabled, readonly]);

  useEffect(() => {
    if (autofocus) {
      focus();
    }
  }, [autofocus]);

  useEffect(() => {
    setRenderType(type);
  }, [type]);

  function focus() {
    focused.current = true;
    inputRef.current?.focus();
  }

  function blur() {
    focused.current = false;
    inputRef.current?.blur();
  }

  const inputValueChangeHandle = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    const { allowInputOverMax, maxcharacter } = props;
    if (!allowInputOverMax && maxcharacter && !Number.isNaN(maxcharacter)) {
      const { characters } = getCharacterLength(value, maxcharacter) as {
        length: number;
        characters: string;
      };
      setInnerValue(characters);
    } else {
      setInnerValue(value);
    }
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
    if (e instanceof InputEvent) {
      const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
      if (e.isComposing || checkInputType) return;
    }
    inputValueChangeHandle(e);
  };

  const handleClear = (e: TouchEvent) => {
    e.preventDefault();
    setInnerValue('');
    focus();
    onClear?.({ e: e as TouchEvent<HTMLInputElement> });
  };

  const handleFocus = (e: FocusEvent) => {
    focused.current = true;
    onFocus?.(innerValue, { e: e as FocusEvent<HTMLInputElement> });
  };

  const handleBlur = (e: FocusEvent) => {
    focused.current = false;
    onBlur?.(innerValue, { e: e as FocusEvent<HTMLInputElement> });
  };

  const handleCompositionend = (e: CompositionEvent) => {
    inputValueChangeHandle(e as CompositionEvent<HTMLInputElement>);
  };

  const handlePwdIconClick = () => {
    if (disabled) {
      return;
    }
    setRenderType((renderType) => (renderType === 'password' ? 'text' : 'password'));
  };

  const renderPrefix = () => (
    <div className={`${rootClassName}__wrap--prefix`}>
      {prefixIcon ? <div className={`${rootClassName}__icon--prefix`}></div> : null}
      <div className={`${rootClassName}__label`}>{parseTNode(label)}</div>
    </div>
  );

  const renderClearable = () =>
    showClear ? (
      <div className={`${rootClassName}__wrap--clearable-icon`} onTouchEnd={handleClear}>
        <CloseCircleFilledIcon />
      </div>
    ) : null;

  const renderSuffix = () =>
    suffix ? <div className={`${rootClassName}__wrap--suffix`}>{parseTNode(suffix)}</div> : null;

  const renderSuffixIcon = () => {
    let tempSuffixIcon = suffixIcon;
    if (type === 'password') {
      if (renderType === 'password') {
        tempSuffixIcon = <BrowseOffIcon onClick={handlePwdIconClick} />;
      } else if (renderType === 'text') {
        tempSuffixIcon = <BrowseIcon onClick={handlePwdIconClick} />;
      }
    }
    return suffixIcon ? <div className={`${rootClassName}__wrap--suffix-icon`}>{tempSuffixIcon}</div> : null;
  };

  const renderTips = () =>
    tips ? <div className={`${rootClassName}__tips ${rootClassName}--${align}`}>{parseTNode(tips)}</div> : null;

  return withNativeProps(
    props,
    <div className={rootClasses}>
      {renderPrefix()}
      <div className={`${rootClassName}__wrap`}>
        <div className={`${rootClassName}__content ${rootClassName}--${status}`}>
          <input
            ref={inputRef}
            autoFocus={autofocus}
            value={innerValue}
            name={name}
            className={inputClasses}
            type={renderType}
            disabled={disabled}
            autoComplete={autocomplete}
            placeholder={placeholder}
            readOnly={readonly}
            maxLength={resultMaxLength || -1}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={handleInput}
            onCompositionEnd={handleCompositionend}
          />
          {renderClearable()}
          {renderSuffix()}
          {renderSuffixIcon()}
        </div>
        {renderTips()}
      </div>
    </div>,
  );
});

export default Input;
