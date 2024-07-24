import React from 'react';
import { Divider } from 'tdesign-mobile-react';
import './style/index.less';

export default function Theme() {
  return (
    <div>
      <div className="divider-demo__title">虚线样式</div>
      <Divider dashed />
      <Divider dashed content="文字信息" align="left" />
      <Divider dashed content="文字信息" />
      <Divider dashed content="文字信息" align="right" />
    </div>
  );
}
