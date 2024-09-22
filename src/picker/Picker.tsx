import React, { FC, useMemo } from 'react';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import PickerView, { getPickerViewDefaultValue } from './PickerView';
import { pickerDefaultProps } from './defaultProps';
import { TdPickerProps } from './type';
import Button from '../button';
import Popup from '../popup';

export interface PickerProps extends TdPickerProps, NativeProps {}

const Picker: FC<PickerProps> = (props) => {
  const {
    visible,
    value,
    defaultValue,
    cancelBtn,
    confirmBtn,
    title,
    header,
    footer,
    children,
    onCancel,
    onConfirm,
    onChange,
  } = props;
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-picker`;

  const internalDefaultValue = useMemo(
    () => getPickerViewDefaultValue(defaultValue, children),
    [defaultValue, children],
  );

  const [internalValue, setInternalValue] = useDefault(value, internalDefaultValue, onChange);

  return (
    <Popup visible={visible} placement="bottom">
      {withNativeProps(
        props,
        <div className={name}>
          {header === true ? (
            <div className={`${name}__toolbar`}>
              <Button className={`${name}__cancel`} variant="text" onClick={(e) => onCancel?.({ e })}>
                {cancelBtn}
              </Button>
              <div className={`${name}__title`}>{title}</div>
              <Button className={`${name}__confirm`} variant="text" onClick={(e) => onConfirm?.(internalValue, { e })}>
                {confirmBtn}
              </Button>
            </div>
          ) : (
            header
          )}
          {/* TODO:popup集成惰性加载后可移除条件渲染 */}
          {visible && (
            <PickerView value={internalValue} onChange={setInternalValue}>
              {children}
            </PickerView>
          )}
          {footer}
        </div>,
      )}
    </Popup>
  );
};

Picker.defaultProps = pickerDefaultProps;
Picker.displayName = 'Picker';

export default Picker;
