import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import BaseDemo from './base';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <h1 className="title">Picker 选择器</h1>
      <p className="summary">用于一组预设数据中的选择。</p>
      <TDemoBlock title="01 组件类型" summary="基础选择器">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件样式"></TDemoBlock>
    </div>
  );
}
