import React, { forwardRef, useState, useEffect, useMemo, useRef, useCallback, useImperativeHandle } from 'react';
import classNames from 'classnames';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { getCharacterLength } from '../_util/helper';
import calcTextareaHeight from '../_common/js/utils/calcTextareaHeight';
import { TdTextareaProps } from './type';
import { StyledProps } from '../common';

export interface TextareaProps extends TdTextareaProps, StyledProps {}
export interface TextareaRefInterface extends React.RefObject<unknown> {
  currentElement: HTMLDivElement;
  textareaElement: HTMLTextAreaElement;
}

const Textarea = forwardRef((props: TextareaProps, ref: TextareaRefInterface) => {
  const { disabled, maxlength, maxcharacter, autofocus, defaultValue, autosize = false, label, ...otherProps } = props;
  const { classPrefix } = useConfig();
  const baseClass = `${classPrefix}-textarea`;

  const [value = '', setValue] = useDefault(props.value, defaultValue, props.onChange);
  const [textareaStyle, setTextareaStyle] = useState({});
  const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef();
  const wrapperRef: React.RefObject<HTMLDivElement> = useRef();

  const textareaLength = useMemo(() => {
    if (typeof maxcharacter !== 'undefined') {
      const { length = 0 } = getCharacterLength(String(value), maxcharacter) as {
        length: number;
      };
      return length;
    }
    return String(value).length || 0;
  }, [value, maxcharacter]);

  const textareaPropsNames = Object.keys(otherProps).filter((key) => !/^on[A-Z]/.test(key));
  const textareaProps = textareaPropsNames.reduce(
    (textareaProps, key) => Object.assign(textareaProps, { [key]: props[key] }),
    {},
  );

  const eventPropsNames = Object.keys(otherProps).filter((key) => /^on[A-Z]/.test(key));
  const eventProps = eventPropsNames.reduce((eventProps, key) => {
    Object.assign(eventProps, {
      [key]: (e) => {
        if (disabled) return;
        props[key](e.currentTarget.value, { e });
      },
    });
    return eventProps;
  }, {});

  const textareaClassNames = classNames(`${baseClass}__wrapper`, {
    [`${baseClass}-is-disabled`]: disabled,
  });

  const adjustTextareaHeight = useCallback(() => {
    if (autosize === true) {
      setTextareaStyle(calcTextareaHeight(textareaRef.current as HTMLTextAreaElement));
    } else if (typeof autosize === 'object') {
      const { minRows, maxRows } = autosize;
      setTextareaStyle(calcTextareaHeight(textareaRef.current as HTMLTextAreaElement, minRows, maxRows));
    } else if (autosize === false) {
      setTextareaStyle({ height: 'auto', minHeight: '96px' });
    }
  }, [autosize]);

  function inputValueChangeHandle(e: React.FormEvent<HTMLTextAreaElement>) {
    const { target } = e;
    let val = (target as HTMLInputElement).value;
    if (maxcharacter && maxcharacter >= 0) {
      const stringInfo = getCharacterLength(val, maxcharacter);
      val = typeof stringInfo === 'object' && stringInfo.characters;
    }
    setValue(val, { e });
  }

  useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight, value]);

  useImperativeHandle(ref as TextareaRefInterface, () => ({
    currentElement: wrapperRef.current,
    textareaElement: textareaRef.current,
  }));

  return (
    <div ref={wrapperRef} className={baseClass}>
      {label && <div className={`${baseClass}__name`}> {label} </div>}
      <div className={textareaClassNames}>
        <textarea
          {...textareaProps}
          {...eventProps}
          value={value}
          style={textareaStyle}
          autoFocus={autofocus}
          disabled={disabled}
          maxLength={maxlength}
          onChange={inputValueChangeHandle}
          ref={textareaRef}
        />
        {(maxcharacter || maxlength) && (
          <div className={`${baseClass}__count`}> {`${textareaLength}/${maxcharacter || maxlength}`} </div>
        )}
      </div>
    </div>
  );
});

export default Textarea;
