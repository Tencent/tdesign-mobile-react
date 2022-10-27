import React from 'react';
import { Divider } from 'tdesign-mobile-react';

import './style/index.less';

export default function Base() {
  return (
    <div className="divider-demo-container">
      <h3>直线拉通</h3>
      <Divider />

      <h3>虚线拉通</h3>
      <Divider dashed />

      <h3>左右间距</h3>
      <div className="t-demo1">
        <Divider />
      </div>

      <h3>右侧拉通</h3>
      <div className="t-demo2">
        <Divider />
      </div>
      <h3>自定义左侧距离</h3>
      <div className="t-demo3">
        <Divider />
      </div>
    </div>
  );
}
