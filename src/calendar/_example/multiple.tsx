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
        type="multiple"
        onConfirm={handleConfirm}
        onSelect={handleSelect}
        onClose={onClose}
      ></Calendar>
      <Cell title="多个选择日期" arrow onClick={() => setVisible(true)}></Cell>
    </div>
  );
}
