import React, { createContext, CSSProperties, forwardRef, Ref, useContext, useRef } from 'react';
import classNames from 'classnames';
import { CheckIcon } from 'tdesign-icons-react';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { TdRadioProps } from './type';
import RadioGroup from './RadioGroup';

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
    align = 'left',
    allowUncheck = false,
    checked = false,
    defaultChecked = false,
    children,
    content,
    contentDisabled,
    disabled,
    icon,
    label,
    maxContentRow = 5,
    maxLabelRow = 3,
    name,
    value,
    borderless = false,
    onChange,
  } = props;

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
      return radioChecked ? icon[0] : icon[1] ?? null;
    }
    return (
      <div
        className={classNames(
          `${classPrefix}__icon`, {
            [`${classPrefix}__icon--checked`]: radioChecked,
            [`${classPrefix}__icon--disabled`]: disabled,
            // [`${classPrefix}__icon--strock`]: icon === 'stroke-line',
            [`${classPrefix}__icon--custom`]: Array.isArray(icon),
        })}
      >
        <CheckIcon size={16} />
      </div>
    );
  };

  const labelStyle = {
    ...getLimitRow(maxLabelRow),
    color: disabled ? '#dcdcdc' : 'inherit',
  };

  const radioClassName = classNames(
    `${classPrefix}`,
    { [`${prefix}-is-checked`]: radioChecked },
    { [`${prefix}-is-disabled`]: disabled },

  );

  const titleClassName = classNames(
    `${prefix}__content-title`,
    { [`${prefix}-is-disabled`]: disabled },
    { [`${prefix}__content-right-title`]: align === 'right' },
  )

  const input = (
    <input
      type="radio"
      readOnly
      name={name}
      ref={inputRef}
      // @ts-ignore
      value={value}
      disabled={disabled}
      className={classNames(`${classPrefix}__original-${align}`)}
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

  return (
    <div className={radioClassName} ref={ref} onClick={() => switchRadioChecked()}>
      <span className={`${classPrefix}__content-wrap`}>
        {align === 'left' &&<span className={ `${classPrefix}__icon-wrap ${classPrefix}__icon-left-wrap`}>
          {input}
          {renderIcon()}
        </span>}
        <span className={`${classPrefix}__label-wrap`}>
          {label && <span className={titleClassName} style={labelStyle}>{label}</span>}
          {(children || content) && (
            <div className={`${classPrefix}__content-inner`}  style={getLimitRow(maxContentRow)}>
              {children || content}
            </div>
          )}
        </span>
        {align === 'right' &&<span className={ `${classPrefix}__icon-wrap ${classPrefix}__icon-right-wrap`}>
          {input}
          {renderIcon()}
        </span>}
      </span>
      {/* 下边框 */}
      { !borderless && <div className={`${classPrefix}__border ${classPrefix}__border--${align}`}></div>}
      <div ></div>
    </div>
  );
});

export default forwardRefWithStatics(
  (props: RadioProps, ref: Ref<HTMLDivElement>) => <Radio ref={ref} {...props}></Radio>,
  { Group: RadioGroup },
);
