import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Vertical from './vertical';
import BaseDemo from './base';
import AlignDemo from './align';

import './style/index.less';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Divider 分割符" summary="用于分割、组织、细化有一定逻辑的组织元素内容和页面结构。" />
      <TDemoBlock title="01 类型" summary="分割符主要是由直线和文字组成">
        <BaseDemo />
        <AlignDemo />
        <Vertical />
      </TDemoBlock>
    </div>
  );
}
