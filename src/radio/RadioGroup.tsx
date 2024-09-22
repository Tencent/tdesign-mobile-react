import React, { useRef } from 'react';
import type { FC, ReactNode } from 'react';
import useConfig from '../_util/useConfig';
import Radio, { RadioContext, RadioContextValue, RadioProps } from './Radio';
import useDefault from '../_util/useDefault';
import type { TdRadioGroupProps } from './type';

export interface RadioGroupProps extends TdRadioGroupProps {
  children?: ReactNode;
  className: string;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const { classPrefix } = useConfig();
  const { disabled, options, value, defaultValue, children, onChange, allowUncheck, borderless, className } = props;
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
        allowUncheck: radioProps.allowUncheck || allowUncheck,
        borderless: radioProps.borderless || borderless,
        onChange: (checked, { e }) => {
          if (typeof radioProps.onChange === 'function') {
            radioProps.onChange(checked, { e });
          }
          // @ts-ignore
          setInternalValue(radioProps.value, { e });
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
