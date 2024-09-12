import React from 'react';
import { Stepper } from 'tdesign-mobile-react';

export default function Theme() {
  return (
    <div className="stepper-example">
      <Stepper defaultValue={3} theme="filled" />
      <Stepper defaultValue={3} theme="outline" />
      <Stepper defaultValue={3} />
    </div>
  );
}
