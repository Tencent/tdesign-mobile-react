import React, { FC, useMemo } from 'react';
import { isUndefined } from 'lodash-es';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import PickerContext from './picker-context';
import { TdPickerProps, PickerValue } from './type';

export const getPickerViewDefaultValue = (defaultValue: Array<PickerValue>, children: React.ReactNode) => {
  const result = (defaultValue || []).slice(0);
  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child) && isUndefined(result[index])) {
      const childOptions = child.props.options || [];
      const optionsCount = childOptions.length;
      const optionsIndex = Math.max(0, optionsCount <= 2 ? optionsCount - 1 : 2);
      result[index] = childOptions[optionsIndex]?.value;
    }
  });
  return result;
};

export interface PickerViewProps extends Pick<TdPickerProps, 'value' | 'defaultValue' | 'onChange'>, NativeProps {}

const PickerView: FC<PickerViewProps> = (props) => {
  const { value, defaultValue, onChange, children } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-picker`;

  const innerValue = useMemo(() => (value || []).slice(0), [value]);
  const innerDefaultValue = useMemo(() => getPickerViewDefaultValue(defaultValue, children), [defaultValue, children]);

  const pickerItems = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    if (isUndefined(innerValue[index])) {
      innerValue[index] = innerDefaultValue[index];
    }
    const childProps = {
      value: value && value[index],
      defaultValue: innerDefaultValue[index],
      itemIndex: index,
    };
    return React.cloneElement(child, childProps);
  });

  const [internalValue, setInternalValue] = useDefault(innerValue, innerDefaultValue, onChange);

  return withNativeProps(
    props,
    <div className={`${name}__main`}>
      <div className={`${name}-item__group`}>
        <PickerContext.Provider
          value={{
            value: internalValue,
            onChange: setInternalValue,
          }}
        >
          {pickerItems}
        </PickerContext.Provider>
      </div>
      <div className={`${name}__mask`} />
      <div className={`${name}__indicator`} />
    </div>,
  );
};

PickerView.displayName = 'PickerView';

export default PickerView;
