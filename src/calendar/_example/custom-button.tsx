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
        confirmBtn={{ content: 'ok', theme: 'danger', shape: 'round' }}
        onConfirm={handleConfirm}
        onSelect={handleSelect}
        onClose={onClose}
      ></Calendar>
      <Cell title="自定义按钮" arrow onClick={() => setVisible(true)}></Cell>
    </div>
  );
}
