import React, { useState } from 'react';
import { Textarea } from 'tdesign-mobile-react';

export default function Events() {
  const [value, onChange] = useState('');

  function onFocus(value, { e }) {
    console.log('onFocus: ', value, e);
  }
  function onBlur(value, { e }) {
    console.log('onBlur: ', value, e);
  }

  return (
    <Textarea
      label="标签文字"
      placeholder="请输入文字"
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={(value) => {
        console.log('==value===', value);
        onChange(value);
      }}
    />
  );
}
