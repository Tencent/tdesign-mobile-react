import React from 'react';
import { Slider } from 'tdesign-mobile-react';

export default function TitleDemo() {
  return (
    <>
      <div className="tdesign-demo-block-wrap__title">选择器标题</div>
      <div className="tdesign-demo-block-wrap__slider">
        <Slider defaultValue={0} label={false} />
      </div>
    </>
  );
}
