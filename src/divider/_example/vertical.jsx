import React from 'react';
import { Divider } from 'tdesign-mobile-react';
import './style/index.less';

export default function Vertical() {
  return (
    <div className="vertical-panel">
      <text>文字信息</text>
      <Divider layout="vertical"></Divider>
      <text>文字信息</text>
      <Divider layout="vertical"></Divider>
      <text>文字信息</text>
    </div>
  );
}
