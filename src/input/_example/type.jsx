import React, { useState } from 'react';
import { InfoCircleFilledIcon } from 'tdesign-icons-react';
import { Input, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  const [value7, setValue7] = useState('');

  return (
    <div className="demo-group">
      <CellGroup title="基础文本框">
        <Input
          label={'标签文字'}
          placeholder="请输入文字"
          value={value1}
          onChange={(value) => {
            setValue1(value);
          }}
        />
      </CellGroup>

      <CellGroup title="必填、选填文本框">
        <Input
          label={'标签文字'}
          placeholder="请输入文字"
          required={true}
          value={value2}
          onChange={(value) => {
            setValue2(value);
          }}
        />
        <Input
          label={'标签文字'}
          placeholder="请输入文字（选填）"
          value={value3}
          onChange={(value) => {
            setValue3(value);
          }}
        />
      </CellGroup>

      <CellGroup title="无标题文本框">
        <Input
          placeholder="请输入文字"
          value={value4}
          onChange={(value) => {
            setValue4(value);
          }}
        />
      </CellGroup>

      <CellGroup title="带提示信息文本框">
        <Input
          label={'标准五个字'}
          placeholder="请输入文字"
          suffixIcon={<InfoCircleFilledIcon />}
          value={value5}
          onChange={(value) => {
            setValue5(value);
          }}
        />
      </CellGroup>

      <CellGroup title="两行样式文本框">
        <Input
          label={'标准五个字'}
          placeholder="请输入文字请输入文字"
          vertical={true}
          value={value6}
          onChange={(value) => {
            setValue6(value);
          }}
        />
      </CellGroup>

      <CellGroup title="长标题文本框">
        <Input
          label={'超长需换行的标签'}
          placeholder="预设文本"
          suffixIcon={<InfoCircleFilledIcon />}
          value={value7}
          onChange={(value) => {
            setValue7(value);
          }}
        />
      </CellGroup>
    </div>
  );
}
