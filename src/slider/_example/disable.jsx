import React from 'react';
import { Slider } from 'tdesign-mobile-react';

export default function DisableDemo() {
  return <Slider defaultValue={30} disabled min={30} label={false} />;
}
