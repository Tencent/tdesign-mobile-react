import React, { CSSProperties, FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';
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

// TODO: 修改为统一禁用样式
const getDisabledStyle = (isDisabled): CSSProperties => ({
  color: isDisabled ? '#DCDCDC' : '',
});

const Radio: FC<RadioProps> = (props) => {
  const context = useContext(RadioGroupContext);
  const inputRef = useRef();

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

  const [radioChecked, setRadioChecked] = useState<boolean>(checked || defaultChecked);

  useEffect(() => {
    if (context) {
      if (context.value[0] === value) {
        setRadioChecked(true);
      } else {
        setRadioChecked(false);
      }
    }
  }, [context, value]);

  const switchRadioChecked = (area?: string) => {
    if (context?.disabled || disabled) {
      return;
    }
    if (area === 'content' && contentDisabled) {
      return;
    }
    if (radioChecked && !allowUncheck) {
      return;
    }
    setRadioChecked(!radioChecked);
    onChange?.(!radioChecked, { e: inputRef.current });
    context?.onChange?.(value, { e: inputRef.current });
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

  const contentStyle = getLimitRow(maxContentRow);
  const labelStyle = getLimitRow(maxLabelRow);
  const alignStyle = getAlignStyle(align);
  const disabledStyle = getDisabledStyle(context?.disabled || disabled);

  const renderContent = () => {
    let contentNode = null;
    const contentTitle = null;
    const contentTitleStyle = !contentTitle && { marginTop: 0 };
    if (content) {
      contentNode = (
        <span
          className={`${cname}__content-wrap`}
          onClick={() => {
            switchRadioChecked('content');
          }}
          style={disabledStyle}
        >
          {contentTitle && (
            <span
              className={c(`${cname}__content-title`, { [`${cname}__content-right-title`]: align === ALIGN.RIGHT })}
            ></span>
          )}
          <span className={`${cname}__content-inner`} style={{ ...contentStyle, ...contentTitleStyle }}>
            {content}
          </span>
        </span>
      );
    } else if (children || label) {
      contentNode = (
        <span className={`${cname}__label-wrap`} style={{ ...labelStyle, ...disabledStyle }}>
          {children || label}
        </span>
      );
    }
    return contentNode;
  };

  const input = (
    <input
      type="radio"
      ref={inputRef}
      readOnly
      name={name}
      className={c(`${cname}__former`)}
      checked={radioChecked}
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
    />
  );

  return (
    <div
      className={c(`${cname}`, { 't-is-disabled': context?.disabled || disabled, 't-is-checked': radioChecked })}
      style={alignStyle}
    >
      <span
        className={c(`${cname}__icon-wrap`, { [`${cname}__icon-right-wrap`]: align === ALIGN.RIGHT })}
        onClick={() => switchRadioChecked()}
      >
        {input}
        {renderIcon()}
      </span>
      {renderContent()}
    </div>
  );
};

export default Radio;
