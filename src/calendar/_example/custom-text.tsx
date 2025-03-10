import React, { useState } from 'react';
import { Calendar, Cell, TDate } from 'tdesign-mobile-react';

export default function () {
  const minDate = new Date(2022, 1, 1);
  const maxDate = new Date(2022, 2, 15);
  const format = (day: TDate) => {
    const { date } = day;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const curDate = date.getDate();
    const dayTmp = day;
    dayTmp.suffix = '¥60';

    if (year === 2022) {
      if (month === 2) {
        const map = {
          1: '初一',
          2: '初二',
          3: '初三',
          14: '情人节',
          15: '元宵节',
        };
        if (curDate in map) {
          dayTmp.prefix = map[curDate];
          dayTmp.suffix = '¥100';
          dayTmp.className = 'is-holiday';
        }
      }
    }

    return day;
  };

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
        value={new Date(2022, 1, 15)}
        format={format}
        minDate={minDate}
        maxDate={maxDate}
        onConfirm={handleConfirm}
        onSelect={handleSelect}
        onClose={onClose}
      ></Calendar>
      <Cell title="自定义文案" arrow onClick={() => setVisible(true)}></Cell>
    </div>
  );
}
