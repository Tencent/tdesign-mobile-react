import React from 'react';
import { Slider } from 'tdesign-mobile-react';
import './style/index.less';

export default function BaseDemo() {
  return (
    <div className="wrapper-base">
      <Slider defaultValue={23} />
    </div>
  );
}
