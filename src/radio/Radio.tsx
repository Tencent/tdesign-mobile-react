import React, { CSSProperties, FC, ReactNode, useContext, useState } from 'react';
import c from 'classnames';
import { Icon } from 'tdesign-icons-react';
import { TdRadioProps } from './type';
import { RadioGroupContext } from './RadioGroup';

const prefix = 't';
const cname = `${prefix}-radio`;

enum ALIGN {
  LEFT = 'left',
  RIGHT = 'right',
}

export type RadioProps = TdRadioProps;

const getLimitRow = (row: number): CSSProperties => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: row,
});

const getAlignStyle = (align): CSSProperties => ({
  flexDirection: align === ALIGN.LEFT ? 'row' : 'row-reverse',
});

const Radio: FC<RadioProps> = (props) => {
  const context = useContext(RadioGroupContext);
  let $props = props;
  if (context) {
    if (props.value && context.value[0] === props.value) {
      $props = { ...$props, checked: true };
    }
  }

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
  } = $props;

  const [radioChecked, setRadioChecked] = useState<boolean>(checked || defaultChecked || false);

  const switchRadioChecked = (e, area?: string) => {
    if (context?.disabled || disabled) {
      return;
    }
    if (area === 'content' && contentDisabled) {
      return;
    }
    if (radioChecked && !allowUncheck) {
      return;
    }
    console.log(e);
    setRadioChecked(!radioChecked);
    onChange?.(!radioChecked, { e });
    context?.onChange(value, { e });
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
    return <Icon className="t-icon" name={iconName} />;
  };

  const input = (
    <input
      type="radio"
      readOnly
      name={name}
      className={c(`${cname}__former`)}
      checked={radioChecked}
      value={value}
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
    />
  );

  const contentStyle = getLimitRow(maxContentRow);
  const labelStyle = getLimitRow(maxLabelRow);
  const alignStyle = getAlignStyle(align);
  return (
    <div className={c(`${cname}`, { 't-is-disabled': context?.disabled || disabled, 't-is-checked': radioChecked })}>
      <span className={`${cname}__content-wrap`} style={alignStyle}>
        <span onClick={(e) => switchRadioChecked(e)}>
          {input}
          <span className={`${cname}__icon-wrap`}>{renderIcon()}</span>
        </span>
        <span
          className={c(`${cname}__label-wrap`, { 't-is-disabled': context?.disabled || disabled })}
          style={{ color: context?.disabled || disabled ? '#DCDCDC' : '' }}
          onClick={(e) => switchRadioChecked(e, 'content')}
        >
          {content && !(children || label) && <span style={contentStyle}>{content}</span>}
          {(children || label) && <span style={labelStyle}>{children || label}</span>}
        </span>
      </span>
    </div>
  );
};

export default Radio;
