import React, { createContext, forwardRef, useContext, useRef } from 'react';
import type { CSSProperties, Ref } from 'react';
import classNames from 'classnames';
import { CheckIcon, CheckCircleFilledIcon } from 'tdesign-icons-react';
import parseTNode from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import useDefault from '../_util/useDefault';
import type { TdRadioProps } from './type';
import RadioGroup from './RadioGroup';
import useDefaultProps from '../hooks/useDefaultProps';
import { radioDefaultProps } from './defaultProps';

export interface RadioProps extends TdRadioProps {
  ref?: Ref<HTMLDivElement>;
}

export interface RadioContextValue {
  inject: (props: RadioProps) => RadioProps;
}
export const RadioContext = createContext<RadioContextValue>(null);

const getLimitRow = (row: number): CSSProperties => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: row,
});

const Radio = forwardRef((_props: RadioProps, ref: Ref<HTMLDivElement>) => {
  const radioClass = usePrefixClass('radio');
  const inputRef = useRef(null);
  const context = useContext(RadioContext);
  const props = context ? context.inject(_props) : _props;

  const {
    allowUncheck,
    block,
    checked,
    content,
    defaultChecked,
    contentDisabled,
    placement = 'left',
    disabled,
    icon,
    label,
    maxContentRow,
    maxLabelRow,
    name,
    value,
    borderless,
    onChange,
    readonly,
    children,
  } = useDefaultProps<TdRadioProps>(props, radioDefaultProps);

  const [radioChecked, setRadioChecked] = useDefault(checked, defaultChecked, onChange);

  const switchRadioChecked = (area?: string) => {
    if (disabled || readonly) {
      return;
    }
    if (area === 'content' && contentDisabled) {
      return;
    }
    if (radioChecked && !allowUncheck) {
      return;
    }
    setRadioChecked(!radioChecked, { e: inputRef.current });
  };

  const renderIcon = () => {
    if (Array.isArray(icon)) {
      return parseTNode(radioChecked ? icon[0] : (icon[1] ?? null));
    }
    if (radioChecked) {
      if (icon === 'circle') {
        return <CheckCircleFilledIcon className={`${radioClass}__icon-wrap`} />;
      }
      if (icon === 'line') {
        return <CheckIcon className={`${radioClass}__icon-wrap`} />;
      }
      if (icon === 'dot') {
        let dotIconClassName = `${radioClass}__icon-${icon}`;
        if (disabled) {
          dotIconClassName += ` ${radioClass}__icon-${icon}--disabled`;
        }
        return <div className={dotIconClassName} />;
      }
    } else {
      if (icon === 'circle' || icon === 'dot') {
        let circleIconClassName = `${radioClass}__icon-circle`;
        if (disabled) {
          circleIconClassName += ` ${radioClass}__icon-circle--disabled`;
        }
        return <div className={circleIconClassName} />;
      }
      if (icon === 'line') {
        return <div className="placeholder" />;
      }
    }
  };

  const radioClassName = classNames(`${radioClass}`, `${radioClass}--${placement}`, {
    [`${radioClass}--block`]: block,
  });

  const titleClassName = classNames(`${radioClass}__title`, { [`${radioClass}__title--disabled`]: disabled });

  const input = (
    <input
      type="radio"
      readOnly={readonly}
      name={name}
      ref={inputRef}
      // @ts-ignore
      value={value}
      disabled={disabled}
      className={classNames(`${radioClass}__original`)}
      checked={radioChecked}
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      onChange={(e) => {
        setRadioChecked(e.currentTarget.checked, { e });
      }}
    />
  );

  const iconClass = classNames(`${radioClass}__icon`, `${radioClass}__icon--${placement}`, {
    [`${radioClass}__icon--checked`]: radioChecked,
    [`${radioClass}__icon--disabled`]: disabled,
  });
  return (
    <div className={radioClassName} ref={ref} onClick={() => switchRadioChecked()}>
      {input}
      <div className={iconClass}>{renderIcon()}</div>
      <div className={`${radioClass}__content`}>
        {(label || children) && (
          <span className={titleClassName} style={{ WebkitLineClamp: maxLabelRow }}>
            {parseTNode(label) || parseTNode(children)}
          </span>
        )}
        {content && (
          <div
            className={`${radioClass}__description ${disabled && `${radioClass}__description--disabled`}`}
            style={getLimitRow(maxContentRow)}
          >
            {parseTNode(content)}
          </div>
        )}
      </div>

      {!borderless && block && <div className={`${radioClass}__border ${radioClass}__border--${placement}`}></div>}
    </div>
  );
});

export default forwardRefWithStatics(
  (props: RadioProps, ref: Ref<HTMLDivElement>) => <Radio ref={ref} {...props}></Radio>,
  { Group: RadioGroup },
);
