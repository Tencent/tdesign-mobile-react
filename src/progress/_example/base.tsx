import React from 'react';
import { Progress } from 'tdesign-mobile-react';

import './style/index.less';

export default function Base() {
  return (
    <div className="example-progress">
      <div className="example-progress__item">
        <Progress percentage={80} />
      </div>
      <div className="example-progress__item">
        <Progress theme="plump" percentage={80} />
      </div>
      <div className="example-progress__item">
        <Progress theme="circle" percentage={30} />
      </div>
    </div>
  );
}
