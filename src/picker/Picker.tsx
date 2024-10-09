import React, { FC, useState, MouseEvent, useEffect } from 'react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import { NativeProps } from '../_util/withNativeProps';
import { pickerDefaultProps } from './defaultProps';
import { TdPickerProps, PickerColumnItem, PickerValue } from './type';
import { PickerColumn } from '.';

import PickerItem, { type PickerItemExposeRef } from './PickerItem';

export interface PickerProps extends TdPickerProps, NativeProps {}

function getDefaultText(prop: unknown, defaultText: string): string {
  if (isString(prop)) return prop;
  if (isBoolean(prop)) return defaultText;
  return;
}

const getIndexFromColumns = (column: PickerColumn, value: PickerValue) => {
  if (!value) return 0;
  return column?.findIndex((item: PickerColumnItem) => item.value === value);
};

const Picker: FC<PickerProps> = (props) => {
  const { value, onChange, defaultValue, columns, onConfirm, onCancel, onPick, title, header } = useDefaultProps(
    props,
    pickerDefaultProps,
  );

  const { classPrefix } = useConfig();
  const name = `${classPrefix}-picker`;

  const [pickerValue, setPickerValue] = useDefault(value, defaultValue, onChange);
  const confirmButtonText = getDefaultText(props.confirmBtn, undefined);
  const cancelButtonText = getDefaultText(props.cancelBtn, undefined);
  const [curValueArray, setCurValueArray] = useState(pickerValue.map((item) => item) || []);

  const realColumns = typeof columns === 'function' ? columns(curValueArray) : columns;
  const curIndexArray = realColumns.map((item: PickerColumn, index: number) => getIndexFromColumns(item, index));
  const [pickerItemInstanceArray, setPickerItemInstanceArray] = useState<PickerItemExposeRef[]>([]);

  const setPickerItemRef = (instance: PickerItemExposeRef, idx: number) => {
    setPickerItemInstanceArray((prev) => {
      const copy = [...prev];
      copy[idx] = instance;
      return copy;
    });
  };

  function handleConfirm(e: MouseEvent<HTMLDivElement>) {
    const target = realColumns.map((item, idx) => item[curIndexArray[idx]]);
    const label = target.map((item) => item.label);
    const value = target.map((item) => item.value);
    setPickerValue(value, {
      columns: [],
      e,
    });
    onConfirm(value, { index: curIndexArray, e, label });
  }
  function handleCancel(e: MouseEvent<HTMLDivElement>) {
    pickerItemInstanceArray.forEach((item, idx) => {
      item?.setIndex(curIndexArray[idx]);
    });
    onCancel({ e });
  }

  function handlePick(context: any, column: number) {
    const { index } = context;

    curIndexArray[column] = index;
    curValueArray[column] = realColumns[column][index]?.value;

    onPick(curValueArray, { index, column });
  }

  useEffect(() => {
    setCurValueArray(pickerValue.map((item) => item));
  }, [pickerValue]);

  useEffect(() => {
    realColumns.forEach((col: PickerColumn, idx: number) => {
      const index = col.findIndex((item) => item.value === curValueArray[idx]);
      curIndexArray[idx] = index > -1 ? index : 0;
      pickerItemInstanceArray[idx]?.setIndex(curIndexArray[idx]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realColumns, curIndexArray]);

  return (
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
              onPick={(context: any) => handlePick(context, idx)}
            />
          </div>
        ))}

        <div className={`${name}__mask ${name}__mask--top`}></div>
        <div className={`${name}__mask ${name}__mask--bottom`}></div>
        <div className={`${name}__indicator`}></div>
      </div>
    </div>
  );
};

Picker.defaultProps = pickerDefaultProps;
Picker.displayName = 'Picker';

export default Picker;
