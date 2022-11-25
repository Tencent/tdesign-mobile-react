import React, { useState } from 'react';
import { Input, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  return (
    <>
      <CellGroup>
        <Input
          label={'小规格H48'}
          placeholder="请输入文字"
          value={value1}
          onChange={(value) => {
            setValue1(value);
          }}
        />
      </CellGroup>
      <CellGroup>
        <Input
          label={'中规格H56'}
          placeholder="请输入文字"
          size="medium"
          value={value2}
          onChange={(value) => {
            setValue2(value);
          }}
        />
      </CellGroup>
    </>
  );
}
