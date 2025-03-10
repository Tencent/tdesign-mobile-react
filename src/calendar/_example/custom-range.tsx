import React, { useState } from 'react';
import { Calendar, Cell } from 'tdesign-mobile-react';

export default function () {
  const [visible, setVisible] = useState(false);

  const handleConfirm = (val: Date) => {
    console.log(val);
    setVisible(false);
  };
  const handleSelect = (val: Date) => {
    console.log(val);
  };
  const onClose = (trigger: string) => {
    setVisible(false);
    console.log('closed by', trigger);
  };

  return (
    <div>
      <Calendar
        visible={visible}
        value={new Date(2022, 0, 15)}
        minDate={new Date(2022, 0, 1)}
        maxDate={new Date(2022, 0, 31)}
        onConfirm={handleConfirm}
        onSelect={handleSelect}
        onClose={onClose}
      ></Calendar>
      <Cell title="自定义日期区间" arrow onClick={() => setVisible(true)}></Cell>
    </div>
  );
}
