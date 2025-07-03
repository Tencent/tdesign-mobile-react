import React, { useState } from 'react';
import { Calendar, Cell } from 'tdesign-mobile-react';

export default function () {
  const [visible, setVisible] = useState(false);
  const [dataNote, setDataNote] = useState('');

  const format = (val: Date) => {
    const date = new Date(val);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleConfirm = (val: Date) => {
    console.log('confirm: ', val);
    setVisible(false);
    setDataNote(format(val));
  };
  const handleSelect = (val: Date) => {
    console.log('select: ', val);
  };
  const onClose = (trigger: string) => {
    setVisible(false);
    console.log('closed by: ', trigger);
  };
  const onPanelChange = ({ year, month }: { year: number; month: number }) => {
    console.log('panel change: ', year, month);
  };
  const onScroll = ({ e }: { e: React.UIEvent }) => {
    console.log('scroll: ', e);
  };

  return (
    <div>
      <Calendar
        visible={visible}
        switchMode="year-month"
        value={new Date(2022, 0, 15)}
        minDate={new Date(2022, 0, 1)}
        maxDate={new Date(2025, 10, 30)}
        onConfirm={handleConfirm}
        onSelect={handleSelect}
        onClose={onClose}
        onPanelChange={onPanelChange}
        onScroll={onScroll}
      ></Calendar>
      <Cell title="带翻页功能" arrow note={dataNote} onClick={() => setVisible(true)}></Cell>
    </div>
  );
}
