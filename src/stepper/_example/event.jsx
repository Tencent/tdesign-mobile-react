import React, { useState } from 'react';
import { Stepper, Cell } from 'tdesign-mobile-react';

export default function Event() {
  const [controlValue, setControlValue] = useState(999);

  const onValueChange = (v) => {
    setControlValue(v);
  };

  return (
    <div className="cell-container">
      <Cell
        title="最大值(999)"
        rightIcon={<Stepper value={controlValue} max={999} onChange={onValueChange}></Stepper>}
      ></Cell>
    </div>
  );
}
