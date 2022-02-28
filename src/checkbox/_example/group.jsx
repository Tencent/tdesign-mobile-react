import React, { useState } from 'react';
import { Checkbox } from 'tdesign-mobile-react/checkbox';

export default function CheckboxExample() {
  const [disabled, setDisabled] = useState(false);
  const [city, setCity] = useState([]);
  const options = [
    {
      label: '全选',
      checkAll: true,
    },
    {
      label: '北京',
      value: 'beijing',
    },
    {
      label: '上海',
      value: 'shanghai',
    },
    {
      label: '广州',
      value: 'guangzhou',
    },
    {
      label: '深圳',
      value: 'shenzhen',
    },
  ];
  return (
    <>
      <Checkbox onChange={(value) => setCity(value ? ['guangzhou','shenzhen'] : [])} label="选中“广州、深圳”" />
      <Checkbox onChange={(value) => setDisabled(value)} label="设置不可选中" />
      <br/>
      <Checkbox.Group
        disabled={disabled}
        value={city}
        onChange={(value) => {
          setCity(value);
        }}
        options={options}
      />      
    </>
  );
}
