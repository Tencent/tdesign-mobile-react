import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { get as lodashGet } from 'lodash-es';
import cls from 'classnames';
import { KeysType, StyledProps } from '../common';
import { PickerColumnItem, PickerValue } from './type';
import Picker from './picker.class';
import useConfig from '../hooks/useConfig';

export interface PickerItemProps extends StyledProps {
  options?: PickerColumnItem[];
  value?: PickerValue;
  renderLabel?: (option: PickerColumnItem) => React.ReactNode;
  onPick?: (context: { value: PickerValue; index: number }) => void;
  swipeDuration?: string | number;
  keys?: KeysType;
}

export interface PickerItemExposeRef {
  setIndex: (index: number) => void;
  setValue: (value: PickerValue) => void;
  setOptions: () => void;
  setUpdateItems: () => void;
}

const PickerItem = forwardRef<PickerItemExposeRef, PickerItemProps>((props, ref) => {
  const { options, value, renderLabel, onPick, swipeDuration = 300, keys } = props;
  const { classPrefix } = useConfig();
  const pickerItemClass = `${classPrefix}-picker-item`;
  const rootRef = useRef<HTMLUListElement>(null);
  const pickerRef = useRef<Picker | null>(null);

  const getIndexByValue = (val: PickerValue) => {
    let defaultIndex = 0;
    if (val !== undefined) {
      defaultIndex = options.findIndex((item) => lodashGet(item, keys?.value ?? 'value') === val);
    }
    return defaultIndex < 0 ? 0 : defaultIndex;
  };

  const updatePickerWithNextTick = (index: number) => {
    if (pickerRef.current) {
      pickerRef.current.updateItems();
      setTimeout(() => {
        pickerRef.current?.updateIndex(index, { isChange: false });
      }, 0);
    }
  };

  const setIndex = (index: number) => {
    updatePickerWithNextTick(index);
  };

  const setValue = (value: PickerValue) => {
    const index = getIndexByValue(value);
    updatePickerWithNextTick(index);
  };

  const setOptions = () => {
    pickerRef.current?.update();
  };

  const setUpdateItems = () => {
    pickerRef.current?.updateItems();
  };

  useImperativeHandle(ref, () => ({
    setIndex,
    setValue,
    setOptions,
    setUpdateItems,
  }));

  const onChange = useCallback(
    (index: number) => {
      const curItem = options[index];
      const changeValue = lodashGet(curItem, keys?.value ?? 'value');
      onPick?.({ value: changeValue, index });
    },
    [options, keys, onPick],
  );

  useEffect(() => {
    if (pickerRef.current) return;
    if (rootRef.current) {
      pickerRef.current = new Picker({
        el: rootRef.current,
        defaultIndex: getIndexByValue(value) || 0,
        keys,
        defaultPickerColumns: options,
        onChange,
        swipeDuration,
        prefixCls: classPrefix,
      });
    }

    return () => {
      pickerRef.current?.destroy();
      pickerRef.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pickerRef.current) return;
    pickerRef.current.onChange = onChange;
  }, [onChange]);

  useEffect(() => {
    if (pickerRef.current) {
      pickerRef.current.updateOptions(options);
      pickerRef.current.updateItems();
    }
  }, [options]);

  const pickerItemCls = (option: PickerColumnItem) =>
    cls([
      `${pickerItemClass}__item`,
      {
        [`${pickerItemClass}__item--disabled`]: lodashGet(option, keys?.disabled ?? 'disabled'),
      },
    ]);

  return (
    <ul ref={rootRef} className={pickerItemClass}>
      {options.map((option, index) => (
        <li key={index} className={pickerItemCls(option)}>
          {renderLabel ? renderLabel(option) : lodashGet(option, keys?.label ?? 'label')}
        </li>
      ))}
    </ul>
  );
});

PickerItem.displayName = 'PickerItem';

export default PickerItem;
