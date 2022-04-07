import React, { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import { TdSwitchProps } from './type';
import { StyledProps } from '../common';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';

export interface SwitchProps extends TdSwitchProps, StyledProps {}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const { customValue, label, disabled, className, colors, style } = props;

  const { classPrefix } = useConfig();

  const switchBaseClassName = `${classPrefix}-switch`;

  const [activeValue, inactiveValue] = customValue;

  const [value, onChange] = useDefault(props.value, props.defaultValue, props.onChange);

  const checked = useMemo(() => {
    if (typeof value !== 'undefined') {
      if (Array.isArray(customValue) && !customValue.includes(value)) {
        throw `${value} is not in customValue: ${JSON.stringify(customValue)}`;
      }
      return value === customValue[0];
    }
  }, [value, customValue]);

  const onInternalClick = () => {
    if (disabled) return;

    onChange?.(!checked ? activeValue : inactiveValue);
  };

  const renderSwitchText = (checked: boolean, label: SwitchProps['label']) => {
    if (typeof label === 'function') {
      return label({ value: checked ? activeValue : inactiveValue });
    }

    if (typeof label === 'string') return label;

    if (Array.isArray(label)) {
      const [activeContent, inactiveContent] = label;
      const content = checked ? activeContent : inactiveContent;

      if (typeof content === 'function') return content();

      return content;
    }

    return null;
  };

  const switchClassName = classNames(switchBaseClassName, className, {
    [`${classPrefix}-is-checked`]: checked,
    [`${classPrefix}-is-disabled`]: disabled,
  });

  return (
    <button ref={ref} className={switchClassName} style={style} onClick={onInternalClick}>
      <span className={`${classPrefix}-switch__text`}>{renderSwitchText(checked, label)}</span>
      <span
        className={`${classPrefix}-switch__node`}
        style={{ backgroundColor: checked ? colors?.[0] : colors?.[1] }}
      ></span>
    </button>
  );
});

Switch.defaultProps = {
  customValue: [true, false],
};

export default Switch;
