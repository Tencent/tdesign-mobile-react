import React, { useState } from 'react';
import { Checkbox } from 'tdesign-mobile-react';

export default function CheckboxExample() {
  const [value, setValue] = useState(['1', '2']);
  const options = [
    {
      label: '全选',
      checkAll: true,
    },
    {
      label: '多选1',
      value: '1',
    },
    {
      label: '多选2',
      value: '2',
    },
    {
      label: '多选3',
      value: '3',
    },
  ];
  return (
    <>
      <Checkbox.Group
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        options={options}
      />
    </>
  );
}
