import React, { createContext, forwardRef, useContext, useRef } from 'react';
import type { CSSProperties, Ref } from 'react';
import classNames from 'classnames';
import { CheckIcon, CheckCircleFilledIcon } from 'tdesign-icons-react';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import useConfig from '../_util/useConfig';
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
  const { classPrefix: prefix } = useConfig();
  const classPrefix = `${prefix}-radio`;
  const inputRef = useRef();
  const context = useContext(RadioContext);
  const props = context ? context.inject(_props) : _props;

  const {
    allowUncheck,
    block,
    checked,
    content,
    defaultChecked,
    contentDisabled,
    placement,
    disabled,
    icon,
    label,
    maxContentRow,
    maxLabelRow,
    name,
    value,
    borderless,
    onChange,
  } = useDefaultProps<TdRadioProps>(props, radioDefaultProps);

  const [radioChecked, setRadioChecked] = useDefault(checked, defaultChecked, onChange);

  const switchRadioChecked = (area?: string) => {
    if (disabled) {
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
      return radioChecked ? icon[0] : (icon[1] ?? null);
    }
    if (radioChecked) {
      if (icon === 'circle') {
        return <CheckCircleFilledIcon className={`${classPrefix}__icon-wrap`} />;
      }
      if (icon === 'line') {
        return <CheckIcon className={`${classPrefix}__icon-wrap`} />;
      }
      if (icon === 'dot') {
        let dotIconClassName = `${classPrefix}__icon-${icon}`;
        disabled && (dotIconClassName += ` ${classPrefix}__icon-${icon}--disabled`);
        return <div className={dotIconClassName} />;
      }
    } else {
      if (icon === 'circle' || icon === 'dot') {
        let circleIconClassName = `${classPrefix}__icon-circle`;
        disabled && (circleIconClassName += ` ${classPrefix}__icon-circle--disabled`);
        return <div className={circleIconClassName} />;
      }
      if (icon === 'line') {
        return <div className="placeholder" />;
      }
    }
  };

  const labelStyle = {
    ...getLimitRow(maxLabelRow),
    color: disabled ? '#dcdcdc' : 'inherit',
  };

  const radioClassName = classNames(`${classPrefix}`, `${classPrefix}--${placement}`, {
    [`${classPrefix}--block`]: block,
  });

  const titleClassName = classNames(`${classPrefix}__title`, { [`${classPrefix}__title--disabled`]: disabled });

  const input = (
    <input
      type="radio"
      readOnly
      name={name}
      ref={inputRef}
      // @ts-ignore
      value={value}
      disabled={disabled}
      className={classNames(`${classPrefix}__original`)}
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

  const iconClass = classNames(`${classPrefix}__icon`, `${classPrefix}__icon--${placement}`, {
    [`${classPrefix}__icon--checked`]: radioChecked,
    [`${classPrefix}__icon--disabled`]: disabled,
  });
  return (
    <div className={radioClassName} ref={ref} onClick={() => switchRadioChecked()}>
      {input}
      <div className={iconClass}>{renderIcon()}</div>
      <div className={`${classPrefix}__content`}>
        {label && (
          <span className={titleClassName} style={labelStyle}>
            {label}
          </span>
        )}
        {content && (
          <div
            className={`${classPrefix}__description ${disabled && `${classPrefix}__description--disabled`}`}
            style={getLimitRow(maxContentRow)}
          >
            {content}
          </div>
        )}
      </div>

      {!borderless && block && <div className={`${classPrefix}__border ${classPrefix}__border--${placement}`}></div>}
    </div>
  );
});

export default forwardRefWithStatics(
  (props: RadioProps, ref: Ref<HTMLDivElement>) => <Radio ref={ref} {...props}></Radio>,
  { Group: RadioGroup },
);
