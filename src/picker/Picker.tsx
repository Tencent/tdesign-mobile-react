import React, { FC, useMemo, useState, useEffect } from 'react';
import { isBoolean, isString, isFunction, get as lodashGet } from 'lodash-es';
import { KeysType } from '../common';
import useDefaultProps from '../hooks/useDefaultProps';

import useConfig from '../hooks/useConfig';
import useDefault from '../_util/useDefault';
import { NativeProps } from '../_util/withNativeProps';
import { pickerDefaultProps } from './defaultProps';
import { TdPickerProps, PickerColumnItem, PickerValue, PickerColumn } from './type';

import PickerItem, { type PickerItemExposeRef } from './PickerItem';
import { getPickerColumns } from './utils';
import PickerContext from './picker-context';

export interface PickerProps extends TdPickerProps, NativeProps {}

function getDefaultText(prop: unknown, defaultText: string): string {
  if (isString(prop)) return prop;
  if (isBoolean(prop)) return defaultText;
  return;
}

const getIndexFromColumns = (column: PickerColumn, value: PickerValue, keys?: KeysType) => {
  if (!value) return 0;
  return column?.findIndex((item: PickerColumnItem) => lodashGet(item, keys?.value ?? 'value') === value);
};

const Picker: FC<PickerProps> = (props) => {
  const { value, onChange, defaultValue, columns, onConfirm, onCancel, onPick, title, header, keys } = useDefaultProps(
    props,
    pickerDefaultProps,
  );

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-picker`;

  const [pickerValue = [], setPickerValue] = useDefault(value, defaultValue, onChange);
  const confirmButtonText = getDefaultText(props.confirmBtn, undefined);
  const cancelButtonText = getDefaultText(props.cancelBtn, undefined);
  const [curValueArray, setCurValueArray] = useState(value?.map((item) => item) ?? []);

  // const realColumns = isFunction(columns) ? getPickerColumns(columns(curValueArray)) : getPickerColumns(columns);
  const realColumns = useMemo(() => {
    if (isFunction(columns)) {
      const columnsArray = columns(curValueArray);
      return getPickerColumns(columnsArray);
    }

    return getPickerColumns(columns);
  }, [columns, curValueArray]);

  const curIndexArray = realColumns.map((item: PickerColumn, index: number) =>
    getIndexFromColumns(item, pickerValue[index], keys),
  );
  const [pickerItemInstanceArray, setPickerItemInstanceArray] = useState<PickerItemExposeRef[]>([]);

  const setPickerItemRef = (instance: PickerItemExposeRef, idx: number) => {
    setPickerItemInstanceArray((prev) => {
      const copy = [...prev];
      copy[idx] = instance;
      return copy;
    });
  };

  function handleConfirm(e: any) {
    const target = realColumns.map((item, idx) => item[curIndexArray[idx]]);
    const label = target.map((item) => lodashGet(item, keys?.label ?? 'label'));
    const value = target.map((item) => lodashGet(item, keys?.value ?? 'value'));
    setPickerValue(value, {
      columns: [],
      e,
    });
    onConfirm?.(value, { index: curIndexArray, e, label });
  }

  function handleCancel(e: any) {
    pickerItemInstanceArray.forEach((item, idx) => {
      item?.setIndex(curIndexArray[idx]);
    });
    onCancel?.({ e });
  }

  function handlePick(context: { value: string; index: number }, column: number) {
    const { index } = context;

    curIndexArray[column] = index;
    const pickColumnValue = lodashGet(realColumns[column][index], keys?.value ?? 'value');
    setCurValueArray((prev) => ({
      ...prev,
      [column]: pickColumnValue,
    }));

    onPick?.(curValueArray, { index, column });
  }

  useEffect(() => {
    setCurValueArray(pickerValue.map((item) => item));
  }, [pickerValue]);

  useEffect(() => {
    realColumns.forEach((col: PickerColumn, idx: number) => {
      const index = col.findIndex((item) => lodashGet(item, keys?.value ?? 'value') === curValueArray[idx]);
      curIndexArray[idx] = Math.max(index, 0);
      pickerItemInstanceArray[idx]?.setIndex(curIndexArray[idx]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realColumns, curIndexArray]);

  return (
    <PickerContext.Provider value={{ keys, value, onChange }}>
      <div className={name}>
        <div className={`${name}__toolbar`}>
          {cancelButtonText ? (
            <div className={`${name}__cancel`} onClick={handleCancel}>
              {cancelButtonText}
            </div>
          ) : null}

          <div className={`${name}__title`}>{title}</div>

          {confirmButtonText ? (
            <div className={`${name}__confirm`} onClick={handleConfirm}>
              {confirmButtonText}
            </div>
          ) : null}
        </div>
        {header}

        <div className={`${name}__main`}>
          {realColumns.map((item, idx) => (
            <div key={idx} className={`${name}-item__group`}>
              <PickerItem
                ref={(instance) => {
                  setPickerItemRef(instance, idx);
                }}
                options={item}
                value={pickerValue[idx]}
                renderLabel={props.renderLabel}
                onPick={(context) => handlePick(context, idx)}
              />
            </div>
          ))}

          <div className={`${name}__mask ${name}__mask--top`} />
          <div className={`${name}__mask ${name}__mask--bottom`} />
          <div className={`${name}__indicator`} />
        </div>
      </div>
    </PickerContext.Provider>
  );
};

Picker.defaultProps = pickerDefaultProps;
Picker.displayName = 'Picker';

export default Picker;
