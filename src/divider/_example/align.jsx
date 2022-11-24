import React from 'react';
import { Divider } from 'tdesign-mobile-react';
import './style/index.less';

export default function Content() {
  return (
    <div className="divider-demo-container">
      <h3>文字+直线</h3>
      <div className="t-demo1">
        <Divider align="center" content="文字信息"></Divider>
      </div>

      <h3>文字+虚线</h3>
      <div className="t-demo1">
        <Divider align="center" dashed>
          文字信息
        </Divider>
      </div>
    </div>
  );
}
