import React from 'react';
import { Progress } from 'tdesign-mobile-react';

import './style/index.less';

export default function Plump() {
  return (
    <div className="example-progress">
      <div className="example-progress__item">
        <Progress theme="plump" percentage={80} />
      </div>
      <div className="example-progress__item">
        <Progress theme="plump" percentage={88} status="warning" />
      </div>
      <div className="example-progress__item">
        <Progress theme="plump" percentage={88} status="error" />
      </div>
      <div className="example-progress__item">
        <Progress theme="plump" percentage={88} status="success" />
      </div>
    </div>
  );
}
