import React, { useState } from 'react';
import { Slider } from 'tdesign-mobile-react';
import type { SliderValue } from 'tdesign-mobile-react';

export default function LabelDemo() {
  const [value, setValue] = useState(10);

  const onChange = (value: number) => {
    setValue(value);
  };

  const handleLabel = (value: SliderValue) => value;

  return (
    <>
      <div className="wrapper-label">
        <Slider label value={value} onChange={onChange} />
      </div>
      <div className="wrapper-label">
        <Slider range showExtremeValue defaultValue={[20, 60]} label={handleLabel} />
      </div>
    </>
  );
}
