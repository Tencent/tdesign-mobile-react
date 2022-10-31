import React, { useState } from 'react';
import { Input, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  return (
    <>
      <CellGroup>
        <Input
          placeholder="最大输入10个字符"
          maxlength={10}
          value={value1}
          onChange={(value) => {
            setValue1(value);
          }}
        />
      </CellGroup>
      <CellGroup>
        <Input
          placeholder="最大输入10个字符，汉字算两个"
          maxcharacter={10}
          value={value2}
          onChange={(value) => {
            setValue2(value);
          }}
        />
      </CellGroup>
    </>
  );
}
