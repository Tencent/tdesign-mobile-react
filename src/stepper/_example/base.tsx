import React from 'react';
import { Stepper } from 'tdesign-mobile-react';

export default function Base() {
  return (
    <div className="stepper-example">
      <Stepper defaultValue={3} theme="filled" />
      <Stepper defaultValue={3.5} theme="filled" integer={false} step={0.5} />
    </div>
  );
}
