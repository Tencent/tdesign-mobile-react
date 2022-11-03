import React from 'react';
import { Slider } from 'tdesign-mobile-react';

const marks = {
  0: '小',
  50: '中',
  100: '大',
};

export default function MarkDemo() {
  return <Slider marks={marks} defaultValue={50} label={false} step={50} />;
}
