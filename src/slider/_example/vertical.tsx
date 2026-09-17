import React from 'react';
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
  const onChange = (value: number | number[]) => {
    console.log(`[onChange] ${value}`);
  };

  const onDragstart = (context: { e: React.TouchEvent<HTMLDivElement> }) => {
    console.log('[onDragstart] ', context.e);
  };

  const onDragend = (value: number | number[]) => {
    console.log('[onDragend] ', value);
  };

  return (
    <div className="wrapper-vertical">
      <div className="wrapper-item">
        <Slider defaultValue={23} label vertical onChange={onChange} onDragstart={onDragstart} onDragend={onDragend} />
      </div>
      <div className="wrapper-item">
        <Slider range defaultValue={[20, 80]} marks={marks} step={20} vertical onChange={onChange} />
      </div>
      <div className="wrapper-item">
        <Slider defaultValue={23} label theme="capsule" vertical onChange={onChange} />
      </div>
      <div className="wrapper-item">
        <Slider range defaultValue={[20, 80]} marks={marks} step={20} theme="capsule" vertical onChange={onChange} />
      </div>
    </div>
  );
}
