import React, { useState } from 'react';
import { Calendar, Cell } from 'tdesign-mobile-react';

export default function () {
  const [dataNote, setDataNote] = useState('');
  const [visible, setVisible] = useState(false);

  const format = (val: Date) => {
    const date = new Date(val);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleConfirm = (val: Date) => {
    console.log(val);
    setDataNote(format(val));
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
      <Calendar visible={visible} onConfirm={handleConfirm} onSelect={handleSelect} onClose={onClose}></Calendar>
      <Cell title="单个选择日期" arrow note={dataNote} onClick={() => setVisible(true)}></Cell>
    </div>
  );
}
