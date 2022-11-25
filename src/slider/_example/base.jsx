import React from 'react';
import { Slider } from 'tdesign-mobile-react';

export default function BaseDemo() {
  const onChange = (value) => {
    console.log(`change to ${value}`);
  };
  return <Slider label={false} defaultValue={0} onChange={onChange} />;
}
