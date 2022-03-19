import React from 'react';
import { CountDown } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';

import './style/specs.less';

export default function Demo() {
  return (
    <TDemoBlock title="规格">
      <div className="t-countdown-specs-demo">
        <div className="demo-group">
          <div className="demo-group-label">纯数字</div>
          <div className="demo-item">
            <div className="demo-item-label">小</div>
            <CountDown time={5768000} format="HH:mm:ss" size="small" />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">中</div>
            <CountDown time={5768000} format="HH:mm:ss" size="medium" />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">大</div>
            <CountDown time={5768000} format="HH:mm:ss" size="large" />
          </div>
        </div>

        <div className="demo-group">
          <div className="demo-group-label">带圆形底</div>
          <div className="demo-item">
            <div className="demo-item-label">小</div>
            <CountDown time={5768000} format="HH:mm:ss" size="small" theme="round" />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">中</div>
            <CountDown time={5768000} format="HH:mm:ss" size="medium" theme="round" />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">大</div>
            <CountDown time={5768000} format="HH:mm:ss" size="large" theme="round" />
          </div>
        </div>

        <div className="demo-group">
          <div className="demo-group-label">带方形底</div>
          <div className="demo-item">
            <div className="demo-item-label">小</div>
            <CountDown time={5768000} format="HH:mm:ss" size="small" theme="square" />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">中</div>
            <CountDown time={5768000} format="HH:mm:ss" size="medium" theme="square" />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">大</div>
            <CountDown time={5768000} format="HH:mm:ss" size="large" theme="square" />
          </div>
        </div>

        <div className="demo-group">
          <div className="demo-group-label">带单位</div>
          <div className="demo-item">
            <div className="demo-item-label">小</div>
            <CountDown time={5768000} format="HH天mm时ss分" size="small" theme="square" splitWithUnit />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">中</div>
            <CountDown time={5768000} format="HH天mm时ss分" size="medium" theme="square" splitWithUnit />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">大</div>
            <CountDown time={5768000} format="HH天mm时ss分" size="large" theme="square" splitWithUnit />
          </div>
        </div>

        <div className="demo-group">
          <div className="demo-group-label">无底色带单位</div>
          <div className="demo-item">
            <div className="demo-item-label">小</div>
            <CountDown time={5768000} format="HH天mm时ss分" size="small" splitWithUnit />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">中</div>
            <CountDown time={5768000} format="HH天mm时ss分" size="medium" splitWithUnit />
          </div>
          <div className="demo-item">
            <div className="demo-item-label">大</div>
            <CountDown time={5768000} format="HH天mm时ss分" size="large" splitWithUnit />
          </div>
        </div>
      </div>
    </TDemoBlock>
  );
}
