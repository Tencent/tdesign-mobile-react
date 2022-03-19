import React, { useRef } from 'react';
import { CountDown } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';

import './style/base.less';

export default function Demo() {
  const ref = useRef(null);

  return (
    <TDemoBlock title="类型">
      <div className="t-countdown-base-demo">
        {/* <button onClick={() => ref.current.pause()}>pause</button>
      <button onClick={() => ref.current.start()}>start</button>
      <button onClick={() => ref.current.reset()}>reset</button> */}
        <div className="demo-item">
          <div className="demo-item-label">时分秒</div>
          <CountDown time={5768000} ref={ref} autoStart={false} />
        </div>
        <div className="demo-item">
          <div className="demo-item-label">带毫秒</div>
          <CountDown time={5768032} millisecond format="HH:mm:ss:SSS" />
        </div>
        <div className="demo-item">
          <div className="demo-item-label">带方形底</div>
          <CountDown time={5768000} millisecond format="HH:mm:ss" theme="square" />
        </div>
        <div className="demo-item">
          <div className="demo-item-label">带圆形底</div>
          <CountDown time={5768000} millisecond format="HH:mm:ss" theme="round" />
        </div>
        <div className="demo-item">
          <div className="demo-item-label">带单位</div>
          <CountDown time={5768000} millisecond format="HH天mm时ss分" splitWithUnit theme="square" />
        </div>
        <div className="demo-item">
          <div className="demo-item-label">无底色带单位</div>
          <CountDown time={5768000} millisecond format="HH天mm时ss分" splitWithUnit />
        </div>
      </div>
    </TDemoBlock>
  );
}
