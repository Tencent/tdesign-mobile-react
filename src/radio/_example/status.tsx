import React from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react';

export default function () {
  const defaultValue = '1';
  const options = [
    {
      value: '1',
      label: '选项禁用-已选',
    },
    {
      value: '2',
      label: '选项禁用-默认',
    },
  ];
  return (
    <RadioGroup disabled value={defaultValue}>
      {options.map((opt) => <Radio value={opt.value} label={opt.label} disabled key={opt.value}></Radio>)}
    </RadioGroup>
  );
}
