import React, { FC, ReactNode, useRef } from 'react';
import useConfig from '../_util/useConfig';
import Radio, { RadioContext, RadioContextValue, RadioProps } from './Radio';
import { TdRadioGroupProps } from './type';
import useDefault from '../_util/useDefault';

export interface RadioGroupProps extends TdRadioGroupProps {
  children?: ReactNode;
}

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const { classPrefix } = useConfig();
  const { disabled, options, value, defaultValue, children, onChange } = props;
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
    options.map((option) => {
      if (typeof option === 'number' || typeof option === 'string') {
        return (
          <Radio value={option} key={option} label={option}>
            {option}
          </Radio>
        );
      }
      return (
        <Radio value={option.value} key={option.value} disabled={option.disabled}>
          {option.label}
        </Radio>
      );
    });
  return (
    <div ref={groupRef} className={`${classPrefix}-radio-group`}>
      <div className={`${classPrefix}-cell-group`}>
        <div className={`${classPrefix}cell-group__container`}>
          <RadioContext.Provider value={context}>{options?.length ? renderOptions() : children}</RadioContext.Provider>
        </div>
      </div>
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
