import React, { useState } from 'react';
import { Input, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [value1, setValue1] = useState('请输入文字');
  const [value2, setValue2] = useState('一段错误填写的内容');
  const [value3, setValue3] = useState('不可编辑的内容');

  return (
    <CellGroup>
      <Input
        label={'标签文字'}
        placeholder="请输入文字"
        value={value1}
        onChange={(value) => {
          setValue1(value);
        }}
      />
      <Input
        label={'填写错误'}
        placeholder="请输入文字"
        errorMessage="提示信息"
        value={value2}
        onChange={(value) => {
          setValue2(value);
        }}
      />
      <Input
        label={'不可编辑'}
        placeholder="请输入文字"
        readonly={true}
        value={value3}
        onChange={(value) => {
          setValue3(value);
        }}
      />
    </CellGroup>
  );
}
