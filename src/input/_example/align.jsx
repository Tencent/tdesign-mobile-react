import React, { useState } from 'react';
import { Input, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');

  return (
    <>
      <CellGroup>
        <Input
          label={'左对齐'}
          placeholder="请输入文字"
          value={value1}
          onChange={(value) => {
            setValue1(value);
          }}
        />
      </CellGroup>
      <CellGroup>
        <Input
          label={'居中'}
          placeholder="请输入文字"
          align="center"
          value={value2}
          onChange={(value) => {
            setValue2(value);
          }}
        />
      </CellGroup>
      <CellGroup>
        <Input
          label={'右对齐'}
          placeholder="请输入文字"
          align="right"
          value={value3}
          onChange={(value) => {
            setValue3(value);
          }}
        />
      </CellGroup>
    </>
  );
}
