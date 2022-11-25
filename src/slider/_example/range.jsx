import React from 'react';
import { Slider } from 'tdesign-mobile-react';

export default function RangDemo() {
  return <Slider showExtremeValue defaultValue={[30, 70]} range />;
}
