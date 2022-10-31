import React, { useState } from 'react';
import { Stepper, Cell } from 'tdesign-mobile-react';

export default function PureStepper() {
  const [controlValue, setControlValue] = useState(999);

  const onValueChange = (v) => {
    setControlValue(v);
  };

  return (
    <div>
      <div className="cell-container">
        <Cell title="禁用" rightIcon={<Stepper disabled></Stepper>}></Cell>
      </div>
      <div className="cell-container">
        <Cell title="禁用(单位)" rightIcon={<Stepper disableInput step={2} disabled></Stepper>}></Cell>
      </div>
      <div className="cell-container">
        <Cell
          title="最大值(999)"
          rightIcon={<Stepper value={controlValue} max={999} onChange={onValueChange}></Stepper>}
        ></Cell>
      </div>
      <div className="cell-container">
        <Cell title="最小值(5)" rightIcon={<Stepper min={5} defaultValue={5}></Stepper>}></Cell>
      </div>
      <div className="pure-group-container">
        <Stepper theme="grey" defaultValue={3} disabled></Stepper>
        <Stepper theme="grey"></Stepper>
        <Stepper theme="grey" defaultValue={999} max={999}></Stepper>
      </div>
    </div>
  );
}
