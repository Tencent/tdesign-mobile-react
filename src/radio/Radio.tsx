import React, { createContext, CSSProperties, forwardRef, Ref, useContext, useRef } from 'react';
import classNames from 'classnames';
import { CheckIcon } from 'tdesign-icons-react';
import forwardRefWithStatics from 'tdesign-mobile-react/_util/forwardRefWithStatics';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { TdRadioProps } from './type';
import RadioGroup from './RadioGroup';

enum ALIGN {
  LEFT = 'left',
  RIGHT = 'right',
}

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

const getAlignStyle = (align): CSSProperties => ({
  flexDirection: align === ALIGN.LEFT ? 'row' : 'row-reverse',
});

const Radio = forwardRef((_props: RadioProps, ref: Ref<HTMLDivElement>) => {
  const { classPrefix: prefix } = useConfig();
  const classPrefix = `${prefix}-radio`;
  const inputRef = useRef();
  const context = useContext(RadioContext);
  const props = context ? context.inject(_props) : _props;

  const {
    align = ALIGN.LEFT,
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
        className={classNames(`${classPrefix}__icon`, {
          [`${classPrefix}__icon--checked`]: radioChecked,
          [`${classPrefix}__icon--disabled`]: disabled,
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
  const alignStyle = getAlignStyle(align);
  const containerClassName = classNames(`${prefix}-cell`, `${prefix}-cell--middle`, `${prefix}-cell--bordered`);
  const iconClassName = classNames(
    { [`${prefix}-cell__left-icon`]: align === ALIGN.LEFT },
    { [`${prefix}-cell__right-icon`]: align === ALIGN.RIGHT },
    `${classPrefix}__wrap`,
  );
  const radioClassName = classNames(
    { [`${prefix}-is-checked`]: radioChecked },
    { [`${prefix}-is-disabled`]: disabled },
    `${classPrefix}`,
  );

  const input = (
    <input
      type="radio"
      readOnly
      name={name}
      ref={inputRef}
      // @ts-ignore
      value={value}
      disabled={disabled}
      className={classNames(`${classPrefix}__former`)}
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
    <div className={`${containerClassName}`} style={alignStyle} ref={ref}>
      <div className={iconClassName}>
        <div className={radioClassName}>
          <div className={`${classPrefix}__content-wrap`}>
            <span className={`${classPrefix}__icon-left`} onClick={() => switchRadioChecked()}>
              {input}
              {renderIcon()}
            </span>
            <span className={`${classPrefix}__label-wrap`}></span>
          </div>
        </div>
      </div>
      <div
        className={`${prefix}-cell__title`}
        onClick={() => {
          switchRadioChecked('content');
        }}
      >
        <span style={labelStyle}>{label}</span>
        {(children || content) && (
          <div className={`${prefix}-cell__description`} style={getLimitRow(maxContentRow)}>
            {children || content}
          </div>
        )}
      </div>
    </div>
  );
});

export default forwardRefWithStatics(
  (props: RadioProps, ref: Ref<HTMLDivElement>) => <Radio ref={ref} {...props}></Radio>,
  { Group: RadioGroup },
);
