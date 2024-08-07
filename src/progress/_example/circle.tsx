import React from 'react';
import { Progress } from 'tdesign-mobile-react';

import './style/index.less';

export default function Circle() {
  return (
    <div className="example-progress">
      <div className="example-progress__item">
        <Progress theme="circle" percentage={80} />
      </div>
      <div className="example-progress__item">
        <Progress theme="circle" percentage={80} status="warning" />
      </div>
      <div className="example-progress__item">
        <Progress theme="circle" percentage={80} status="error" />
      </div>
      <div className="example-progress__item">
        <Progress theme="circle" percentage={80} status="success" />
      </div>
    </div>
  );
}
