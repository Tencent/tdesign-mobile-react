import React from 'react';
import { Stepper } from 'tdesign-mobile-react';

export default function Size() {
  return (
    <div className="stepper-example">
      <Stepper defaultValue={3} theme="filled" size="large" />
      <Stepper defaultValue={3} theme="filled" max={999} />
      <Stepper defaultValue={3} theme="filled" size="small" />
    </div>
  );
}
