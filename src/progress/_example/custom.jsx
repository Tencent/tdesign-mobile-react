import React from 'react';
import { Progress } from 'tdesign-mobile-react';
import './style/index.less';

export default function Custom() {
  const customPercentage = 88;
  return (
    <div className="example-progress">
      <div className="example-progress__item">
        <Progress percentage={customPercentage} trackColor="#EAC9FF" color="#CD04FF">
          <span className="label--color">{customPercentage}%</span>
        </Progress>
      </div>
      <div className="example-progress__item">
        <Progress className={'radius--round'} percentage={customPercentage} />
      </div>
    </div>
  );
}
