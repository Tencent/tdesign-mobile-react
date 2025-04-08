import React, { useRef } from 'react';
import type { FC, ReactNode } from 'react';
import { StyledProps } from '../common';
import useConfig from '../hooks/useConfig';
import Radio, { RadioContext, RadioContextValue, RadioProps } from './Radio';
import useDefault from '../_util/useDefault';
import type { TdRadioGroupProps } from './type';

export interface RadioGroupProps extends TdRadioGroupProps, StyledProps {
  children?: ReactNode;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const { classPrefix } = useConfig();
  const {
    disabled,
    options,
    value,
    defaultValue,
    children,
    readonly,
    onChange,
    allowUncheck,
    borderless,
    className,
    placement,
  } = props;
  const groupRef = useRef(null);
  const [internalValue, setInternalValue] = useDefault(value, defaultValue, onChange);

  const context: RadioContextValue = {
    inject: (radioProps: RadioProps) => {
      if (typeof radioProps.checked !== 'undefined') {
        return radioProps;
      }
      return {
        ...radioProps,
        checked:
          typeof internalValue !== 'undefined' &&
          typeof radioProps.value !== 'undefined' &&
          internalValue === radioProps.value,
        disabled: radioProps.disabled || disabled,
        readonly: radioProps.readonly || readonly,
        allowUncheck: radioProps.allowUncheck || allowUncheck,
        borderless: radioProps.borderless || borderless,
        placement: radioProps.placement || placement,
        onChange: (checked, { e }) => {
          if (typeof radioProps.onChange === 'function') {
            radioProps.onChange(checked, { e });
          }
          setInternalValue(radioProps.value, { e, name: props.name });
        },
      };
    },
  };

  const renderOptions = () =>
    options.map((option, index) => {
      if (typeof option === 'number' || typeof option === 'string') {
        return (
          <Radio value={option} key={option} label={option}>
            {option}
          </Radio>
        );
      }
      return (
        <Radio value={option.value} key={index} disabled={option.disabled}>
          {option.label}
        </Radio>
      );
    });
  return (
    <div ref={groupRef} className={`${classPrefix}-radio-group ${className || ''}`}>
      <RadioContext.Provider value={context}>{options?.length ? renderOptions() : children}</RadioContext.Provider>
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
