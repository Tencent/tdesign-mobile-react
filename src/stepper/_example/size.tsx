import React from 'react';
import { Stepper } from 'tdesign-mobile-react';

export default function size() {
  const handleChange = ($event: number) => {
    console.log(`change to ${$event}`);
  };

  return (
    <div className="stepper-example">
      <Stepper value={3} size={'large'} theme={'filled'} onChange={handleChange}></Stepper>
      <Stepper value={3} max={99} theme={'filled'}></Stepper>
      <Stepper value={3} size={'small'} theme={'filled'}></Stepper>
    </div>
  );
}
