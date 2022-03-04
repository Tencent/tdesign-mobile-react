import React from 'react';
import { CountDown } from 'tdesign-mobile-react/count-down';

export default function () {
  return (
    <div style={{ padding: '0 16px' }}>
      <div>
        <CountDown time={5768000} />
        <span>时分秒</span>
      </div>
      <div>
        <CountDown time={5768032} millisecond format="HH:mm:ss:SSS" />
        <span>带毫秒</span>
      </div>
      <div>
        <CountDown time={5768000} millisecond format="HH:mm:ss" splitWithUnit theme="square" />
        <span>带方形底</span>
      </div>
      <div>
        <CountDown time={5768000} millisecond format="HH:mm:ss" splitWithUnit theme="round" />
        <span>带圆形底</span>
      </div>
    </div>
  );
}
