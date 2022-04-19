import React, { createContext, CSSProperties, forwardRef, ReactNode, Ref, useContext, useRef } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
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
  const { classPrefix } = useConfig();
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
    icon = 'fill-circle',
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
    let iconName = '';
    let iconNode: ReactNode;
    if (icon === 'fill-circle') {
      if (radioChecked) {
        iconName = 'check-circle-filled';
      } else {
        iconName = 'circle';
      }
    } else if (icon === 'stroke-line') {
      if (radioChecked) {
        iconName = 'check';
      }
    } else if (Array.isArray(icon)) {
      if (radioChecked) {
        [iconNode] = icon;
      } else {
        [, iconNode] = icon;
      }
    }
    if (iconNode) return <>{iconNode}</>;
    return (
      <Icon
        className={classNames(`${classPrefix}-icon`, {
          [`${classPrefix}-radio__checked__disable-icon`]: disabled,
        })}
        name={iconName}
      />
    );
  };

  const labelStyle = {
    ...getLimitRow(maxLabelRow),
    color: disabled ? '#dcdcdc' : 'inherit',
  };
  const alignStyle = getAlignStyle(align);
  const containerClassName = classNames(
    `${classPrefix}-cell`,
    `${classPrefix}-cell--middle`,
    `${classPrefix}-cell--bordered`,
  );
  const iconClassName = classNames(
    { [`${classPrefix}-cell__left-icon`]: align === ALIGN.LEFT },
    { [`${classPrefix}-cell__right-icon`]: align === ALIGN.RIGHT },
    `${classPrefix}-radio__wrap`,
  );
  const radioClassName = classNames(
    { [`${classPrefix}-is-checked`]: radioChecked },
    { [`${classPrefix}-is-disabled`]: disabled },
    `${classPrefix}-radio`,
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
      className={classNames(`${classPrefix}-radio__former`)}
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
          <div className={`${classPrefix}-radio__content-wrap`}>
            <span className={`${classPrefix}-radio__icon-left`} onClick={() => switchRadioChecked()}>
              {input}
              {renderIcon()}
            </span>
            <span className={`${classPrefix}-radio__label-wrap`}></span>
          </div>
        </div>
      </div>
      <div
        className={`${classPrefix}-cell__title`}
        onClick={() => {
          switchRadioChecked('content');
        }}
      >
        <span style={labelStyle}>{label}</span>
        {(children || content) && (
          <div className={`${classPrefix}-cell__description`} style={getLimitRow(maxContentRow)}>
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
