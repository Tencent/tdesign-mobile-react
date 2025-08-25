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

const Textarea = forwardRef<TextareaRefInterface, TextareaProps>((originProps, ref) => {
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
    cursorColor,
    onCompositionstart,
    onCompositionend,
    ...otherProps
  } = props;

  const textareaClass = usePrefixClass('textarea');

  const [value, setValue] = useDefault(props.value, defaultValue, props.onChange);
  const [textareaStyle, setTextareaStyle] = useState({});
  const composingRef = useRef(false);
  const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
  const wrapperRef: React.RefObject<HTMLDivElement> = useRef(null);

  const textareaLength = useMemo(() => {
    const realValue = value ?? '';
    if (typeof maxcharacter !== 'undefined') {
      const { length = 0 } = getCharacterLength(String(realValue), maxcharacter) as {
        length: number;
      };
      return length;
    }
    return String(realValue).length || 0;
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

  const textareaInnerClasses = classNames(`${textareaClass}__wrapper-inner`, `${textareaClass}__placeholder`, {
    [`${textareaClass}--disabled`]: disabled,
    [`${textareaClass}--readonly`]: readonly,
  });

  const adjustTextareaHeight = useCallback(() => {
    if (autosize === true) {
      setTextareaStyle(calcTextareaHeight(textareaRef.current as HTMLTextAreaElement));
    } else if (autosize === false) {
      if (props.rows) {
        setTextareaStyle({ height: 'auto', minHeight: 'auto' });
      } else {
        setTextareaStyle(calcTextareaHeight(textareaRef.current as HTMLTextAreaElement, 1, 1));
      }
    } else if (typeof autosize === 'object') {
      const { minRows, maxRows } = autosize;
      setTextareaStyle(calcTextareaHeight(textareaRef.current as HTMLTextAreaElement, minRows, maxRows));
    }
  }, [autosize, props.rows]);

  const inputValueChangeHandle = (e: React.FormEvent<HTMLTextAreaElement>) => {
    let { value: newStr } = e.target as HTMLInputElement;

    if (value === newStr) return; // 避免在Firefox中重复触发

    if (!allowInputOverMax && !composingRef.current) {
      if (maxcharacter && maxcharacter >= 0) {
        const stringInfo = getCharacterLength(newStr, maxcharacter);
        newStr = typeof stringInfo === 'object' && stringInfo.characters;
      } else {
        newStr = limitUnicodeMaxLength(newStr, Number(maxlength));
      }
    }

    setValue(newStr, { e });
  };

  const handleCompositionStart = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
    composingRef.current = true;
    const {
      currentTarget: { value },
    } = e;
    onCompositionstart?.(value, { e });
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
    if (composingRef.current) {
      composingRef.current = false;
      inputValueChangeHandle(e);
    }
    const {
      currentTarget: { value },
    } = e;
    onCompositionend?.(value, { e });
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight, value]);

  useImperativeHandle(ref as TextareaRefInterface, () => ({
    currentElement: wrapperRef.current,
    textareaElement: textareaRef.current,
  }));

  const renderLabel = () => <div className={`${textareaClass}__label`}> {parseTNode(label)} </div>;

  const renderIndicator = () => {
    const isShowIndicator = indicator && (maxcharacter || maxlength);
    if (!isShowIndicator) {
      return null;
    }
    return <div className={`${textareaClass}__indicator`}>{`${textareaLength}/${maxcharacter || maxlength}`}</div>;
  };

  return (
    <div ref={wrapperRef} className={textareaClasses} style={style}>
      {label && renderLabel()}
      <div className={`${textareaClass}__wrapper`}>
        <textarea
          {...textareaProps}
          {...eventProps}
          className={textareaInnerClasses}
          style={{ ...textareaStyle, caretColor: cursorColor }}
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
