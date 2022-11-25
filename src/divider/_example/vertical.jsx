import React from 'react';
import { Divider } from 'tdesign-mobile-react';
import './style/index.less';

export default function Vertical() {
  return (
    <div className="divider-demo-container">
      <h3>纯文字</h3>
      <div className="t-demo1">
        <Divider align="center" lineColor="transparent">
          没有更多了～
        </Divider>
      </div>

      <h3>垂直分割</h3>
      <div className="vertical-panel">
        <text>文字信息</text>
        <Divider layout="vertical"></Divider>
        <text>文字信息</text>
        <Divider layout="vertical"></Divider>
        <text>文字信息</text>
      </div>
    </div>
  );
}
