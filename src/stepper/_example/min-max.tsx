import React, { useState } from 'react';
import { Stepper } from 'tdesign-mobile-react';

export default function MinMax() {
  const [number, setNumber] = useState(0);
  const onChange = ($event: number) => {
    console.log(`change to ${$event}`);
    setNumber($event);
  };
  const onBlur = ($event: number) => {
    console.log(`blur to ${$event}`);
  };
  const onOverlimit = ($type: string) => {
    console.log(`onOverlimit ${$type}`);
  };

  return (
    <div className="stepper-example">
      <Stepper defaultValue={0} theme="filled" />
      <Stepper
        value={number}
        theme="filled"
        step={1}
        min={0}
        max={10}
        onOverlimit={onOverlimit}
        onChange={onChange}
        onBlur={onBlur}
      />
      <Stepper defaultValue={999} theme="filled" max={999} />
    </div>
  );
}
