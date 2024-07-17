import React, { useState } from 'react';
import { Input, Button, CellGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [value1, setValue1] = useState('12132131');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');

  return (
    <>
      <CellGroup>
        <Input
          label={'密码'}
          placeholder="请输入文字"
          type="password"
          clearable={true}
          value={value1}
          onChange={(value) => {
            setValue1(value);
          }}
        />
      </CellGroup>
      <CellGroup>
        <Input
          label={'验证码'}
          placeholder="输入验证码"
          suffix="XYDZ"
          value={value2}
          onChange={(value) => {
            setValue2(value);
          }}
        />
      </CellGroup>
      <CellGroup>
        <Input
          placeholder="请输入手机号码"
          suffix={
            <Button theme="primary" variant="text" size="small" style={{ height: '24px', padding: 0 }}>
              发送验证码
            </Button>
          }
          value={value3}
          onChange={(value) => {
            setValue3(value);
          }}
        />
      </CellGroup>
      <CellGroup>
        <Input
          label={'价格'}
          placeholder="0.00"
          suffix="元"
          align="right"
          value={value4}
          onChange={(value) => {
            setValue4(value);
          }}
          className="t-input-suffix-noseparate"
        />
      </CellGroup>
      <CellGroup>
        <Input
          label={'个数'}
          placeholder="请输入个数"
          suffix="个"
          align="right"
          value={value5}
          onChange={(value) => {
            setValue5(value);
          }}
          className="t-input-suffix-noseparate"
        />
      </CellGroup>
    </>
  );
}
