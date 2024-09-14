import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

import BaseDemo from './base';
import MultipleDemo from './multiple';
import NormalDemo from './normal';

export default function BadgeDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="TreeSelect 树形选择器" summary="用于多层级数据的逐级选择。" />
      <TDemoBlock title="01 组件类型" summary="基础树形选择">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="多选树形选择">
        <MultipleDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件状态" summary="三级树形选择">
        <NormalDemo />
      </TDemoBlock>
    </div>
  );
}
