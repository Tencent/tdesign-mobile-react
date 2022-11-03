import React from 'react';
import { Slider } from 'tdesign-mobile-react';

export default function UnZeroDemo() {
  return <Slider min={30} max={200} defaultValue={30} label={false} />;
}
