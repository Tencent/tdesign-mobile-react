import React from 'react';
import { Stepper } from 'tdesign-mobile-react';

export default function PureStepper() {
  return (
    <div className="pure-stepper-container">
      <Stepper theme="grey" defaultValue={3}></Stepper>
    </div>
  );
}
