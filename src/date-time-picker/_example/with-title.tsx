import React, { useState } from 'react';
import { DateTimePicker, Cell, Popup } from 'tdesign-mobile-react';
import './styles/index.less';

export default function DateTimePickerDemo() {
  const [visible, setVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState(['2025-07-09', '2025-07-10']);
  const [hasTitle, setHasTitle] = useState(false);

  const onPick = (value: string) => {
    console.log('[onPick]', value);
  };
  const onChange = (value) => {
    console.log('[onChange]', value);
  };

  const onCancel = () => {
    console.log('[onCancel]');
    setVisible(false);
  };

  const onConfirm = (value: string) => {
    setVisible(false);
    if (hasTitle) {
      setPickerValue([value, pickerValue[1]]);
    } else {
      setPickerValue([pickerValue[0], value]);
    }
  };

  const onShow = (hasTitle) => {
    setHasTitle(hasTitle);
    setVisible(true);
  };

  console.log('hasTitle', hasTitle);
  console.log('pickerValue', pickerValue);
  return (
    <div className="with-title-demo">
      <Cell title="带标题时间选择器" note={pickerValue[0]} onClick={() => onShow(true)} />
      <Cell title="无标题时间选择器" note={pickerValue[1]} onClick={() => onShow(false)} />
      <Popup visible={visible && hasTitle} placement="bottom">
        <DateTimePicker
          value={pickerValue[0]}
          mode="date"
          title="选择时间"
          start="2022-12-12"
          format="YYYY-MM-DD"
          onPick={onPick}
          onChange={onChange}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </Popup>
      <Popup visible={visible && !hasTitle} placement="bottom">
        <DateTimePicker
          value={pickerValue[1]}
          mode="date"
          title=""
          start="2022-12-12"
          format="YYYY-MM-DD"
          onPick={onPick}
          onChange={onChange}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </Popup>
    </div>
  );
}
