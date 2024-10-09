import React, { forwardRef, useState, useEffect, useMemo, useRef, useCallback, useImperativeHandle } from 'react';
import classNames from 'classnames';
import parseTNode from '../_util/parseTNode';
import useDefault from '../_util/useDefault';
import { getCharacterLength, limitUnicodeMaxLength } from '../_util/helper';
import calcTextareaHeight from '../_common/js/utils/calcTextareaHeight';
import { textareaDefaultProps } from './defaultProps';
import { TdTextareaProps } from './type';
import { StyledProps } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';

export interface TextareaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'value' | 'defaultValue' | 'onBlur' | 'onChange' | 'onFocus'
    >,
    TdTextareaProps,
    StyledProps {}

export interface TextareaRefInterface extends React.RefObject<unknown> {
  currentElement: HTMLDivElement;
  textareaElement: HTMLTextAreaElement;
}

const Textarea = forwardRef((originProps: TextareaProps, ref: TextareaRefInterface) => {
  const props = useDefaultProps<TextareaProps>(originProps, textareaDefaultProps);
  const {
    className,
    style,
    allowInputOverMax,
    autofocus,
    bordered,
    disabled,
    defaultValue,
    maxlength,
    maxcharacter,
    layout,
    autosize,
    label,
    indicator,
    readonly,
    ...otherProps
  } = props;

  const textareaClass = usePrefixClass('textarea');

  const [value = '', setValue] = useDefault(props.value, defaultValue, props.onChange);
  const [textareaStyle, setTextareaStyle] = useState({});
  const composingRef = useRef(false);
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

  const textareaClasses = classNames(
    `${textareaClass}`,
    {
      [`${textareaClass}--layout-${layout}`]: layout,
      [`${textareaClass}--border`]: bordered,
    },
    className,
  );

  const textareaInnerClasses = classNames(`${textareaClass}__wrapper-inner`, {
    [`${textareaClass}--disabled`]: disabled,
    [`${textareaClass}--readonly`]: readonly,
  });

  const adjustTextareaHeight = useCallback(() => {
    if (autosize === true) {
      setTextareaStyle(calcTextareaHeight(textareaRef.current as HTMLTextAreaElement));
    } else if (autosize === false) {
      props.rows
        ? setTextareaStyle({ height: 'auto', minHeight: 'auto' })
        : setTextareaStyle(calcTextareaHeight(textareaRef.current as HTMLTextAreaElement, 1, 1));
    } else if (typeof autosize === 'object') {
      const { minRows, maxRows } = autosize;
      setTextareaStyle(calcTextareaHeight(textareaRef.current as HTMLTextAreaElement, minRows, maxRows));
    }
  }, [autosize, props.rows]);

  const inputValueChangeHandle = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { target } = e;
    let val = (target as HTMLInputElement).value;
    if (!allowInputOverMax && !composingRef.current) {
      val = limitUnicodeMaxLength(val, maxlength);
      if (maxcharacter && maxcharacter >= 0) {
        const stringInfo = getCharacterLength(val, maxcharacter);
        val = typeof stringInfo === 'object' && stringInfo.characters;
      }
    }
    setValue(val, { e });
  };

  const handleCompositionStart = () => {
    composingRef.current = true;
  };

  const handleCompositionEnd = (e) => {
    if (composingRef.current) {
      composingRef.current = false;
      inputValueChangeHandle(e);
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight, value]);

  useImperativeHandle(ref as TextareaRefInterface, () => ({
    currentElement: wrapperRef.current,
    textareaElement: textareaRef.current,
  }));

  const renderLabel = () => label && <div className={`${textareaClass}__label`}> {parseTNode(label)} </div>;

  const renderIndicator = () => {
    const isShowIndicator = indicator && (maxcharacter || maxlength);
    if (!isShowIndicator) {
      return null;
    }
    return <div className={`${textareaClass}__indicator`}>{`${textareaLength}/${maxcharacter || maxlength}`}</div>;
  };

  return (
    <div ref={wrapperRef} className={textareaClasses} style={style}>
      {renderLabel()}
      <div className={`${textareaClass}__wrapper`}>
        <textarea
          {...textareaProps}
          {...eventProps}
          className={textareaInnerClasses}
          style={textareaStyle}
          value={value}
          readOnly={readonly}
          autoFocus={autofocus}
          disabled={disabled}
          onChange={inputValueChangeHandle}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          ref={textareaRef}
        />
        {renderIndicator()}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
