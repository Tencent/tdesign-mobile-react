import React, { useState } from 'react';
import { Slider } from 'tdesign-mobile-react';

const marks = {
  0: '0',
  20: '20',
  40: '40',
  60: '60',
  80: '80',
  100: '100',
};

export default function VerticalDemo() {
  const [rangeValue] = useState<[number, number]>([20, 80]);

  const onChange = (value: number | number[]) => {
    console.log(`[onChange] ${value}`);
  };

  const onDragend = (value: number | number[], context: { e: React.TouchEvent<HTMLDivElement> }) => {
    console.log('[onDragend] ', value, context.e);
  };

  const onDragstart = (context: { e: React.TouchEvent<HTMLDivElement> }) => {
    console.log('[onDragstart] ', context.e);
  };

  const handleLabel = (value: any) => value;

  return (
    <>
      <div className="wrapper-vertical">
        <Slider
          defaultValue={23}
          label={handleLabel}
          vertical
          onChange={onChange}
          onDragend={onDragend}
          onDragstart={onDragstart}
        />
      </div>
      <div className="wrapper-vertical">
        <Slider defaultValue={rangeValue} marks={marks} step={20} range vertical onChange={onChange} />
      </div>
      <div className="wrapper-vertical">
        <Slider defaultValue={23} label="handleLabel" theme="capsule" vertical onChange={onChange} />
      </div>
      <div className="wrapper-vertical">
        <Slider defaultValue={[20, 80]} marks={marks} step={20} range theme="capsule" vertical onChange={onChange} />
      </div>
    </>
  );
}
