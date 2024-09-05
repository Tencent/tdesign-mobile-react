import React, { useRef, useImperativeHandle, useEffect } from 'react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import useConfig from '../_util/useConfig';
import withNativeProps, { NativeProps } from '../_util/withNativeProps';
import { PickerValue } from './type';
import { PickerColumnItem, PickerProps } from '.';
import Picker from './picker.class';
import forwardRefWithStatics from '../_util/forwardRefWithStatics';

export interface PickerItemProps extends NativeProps {
  renderLabel?: PickerProps['renderLabel'];
  onPick?: PickerProps['onPick'];
  value?: PickerValue;
  options: PickerColumnItem[];
}

export type PickerItemExposeRef = {
  setIndex: (index: number) => void;
  setValue: (value: number | string | undefined) => void;
  setOptions: () => void;
  setUpdateItems: () => void;
};

const PickerItem = forwardRefWithStatics<PickerItemProps, PickerItemExposeRef>((props, ref) => {
  const { options, value, renderLabel } = useDefaultProps(props, {});
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-picker`;
  const itemClassName = `${name}__item`;

  const picker = useRef<Picker | null>(null);

  function getIndexByValue(value: number | string | undefined) {
    let defaultIndex = 0;
    if (value !== undefined) {
      defaultIndex = options.findIndex((option) => value === option.value);
    }

    return Math.max(0, defaultIndex);
  }

  function setIndex(index: number) {
    const currentPicker = picker.current;
    if (currentPicker) {
      currentPicker.updateItems();
      currentPicker.updateIndex(index, {
        inChange: false,
      });
    }
  }

  function setValue(value: number | string | undefined) {
    const currentPicker = picker.current;

    if (currentPicker) {
      currentPicker.updateItems();
      currentPicker.updateIndex(getIndexByValue(value), {
        inChange: false,
      });
    }
  }

  const setOptions = () => picker.current?.update();
  const setUpdateItems = () => picker.current?.updateItems();

  const rootRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    picker.current = new Picker({
      el: rootRef.current,
      defaultIndex: getIndexByValue(value) || 0,
      onChange: () => {
        //
      },
      // onChange: (index: number) => {
      //   const curItem = options[index];
      //   const changeValue = {
      //     value: curItem.value,
      //     index,
      //   };
      //   // onPick(changeValue, curItem)
      //   // onPick(changeValue, {} as any)
      // },
      prefix: classPrefix,
    });
    return () => (picker.current = null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 更新一下 prefix
    picker.current?.updatePrefix(classPrefix);
  }, [classPrefix]);

  useEffect(() => {
    // mounted 后
    if (rootRef.current && picker.current) {
      picker.current.updateItems();
    }
  }, [props.options]);

  function renderOptions() {
    if (options.length === 0) return null;
    return options.map((option, index) => (
      <div key={index} className={itemClassName}>
        {renderLabel ? renderLabel(option) : option.label}
      </div>
    ));
  }

  useImperativeHandle(ref, () => ({
    setIndex,
    setValue,
    setOptions,
    setUpdateItems,
  }));

  return withNativeProps(props, <ul ref={rootRef}>{renderOptions()}</ul>);
});

PickerItem.displayName = 'PickerItem';

export default PickerItem;
