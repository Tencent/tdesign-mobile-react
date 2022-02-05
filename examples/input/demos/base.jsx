import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'tdesign-mobile-react/input';
import { CheckCircleFilledIcon } from 'tdesign-icons-react';

export default function Base() {
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current.value);
  }, [ref]);
  const [value, setValue] = useState('默认值');
  return (
    <>
      <h1 style={{ padding: '10px 10px' }}>基础文本框</h1>
      <Input
        label={'标签文字等待'}
        maxlength={2}
        placeholder="请输入文字"
        value={value}
        onChange={(value) => {
          setValue(value);
          console.log(value);
        }}
        clearable={true}
      />

      <h1 style={{ padding: '10px 10px' }}>必填、选填文本框</h1>
      <Input
        label={'标签文字'}
        align="right"
        disabled={true}
        errorMessage={'错误信息'}
        placeholder="请输入文字"
        value={value}
        onChange={(value) => {
          setValue(value);
          console.log(value);
        }}
      />
      <Input
        align="center"
        autofocus={true}
        placeholder="请输入文字"
        value={value}
        suffix="vv"
        onChange={(value) => {
          setValue(value);
          console.log(value);
        }}
      />
      <h1 style={{ padding: '10px 10px' }}>size</h1>
      <Input
        label={'标签'}
        placeholder="请输入文字"
        size="medium"
        value={value}
        suffixIcon={<CheckCircleFilledIcon />}
        onEnter={(val) => {
          console.log('onEnter', val);
        }}
      />
      <Input label={'标签'} placeholder="请输入文字" size="medium" defaultValue="sss" ref={ref} />
    </>
  );
}
