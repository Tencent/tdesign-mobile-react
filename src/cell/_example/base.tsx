import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

import Single from './single';
import Multiple from './multiple';
import Group from './group';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Cell 单元格"
        summary="一行内容/功能的垂直排列方式。一行项目左侧为主要内容展示区域，右侧可增加更多操作内容"
      />
      <TDemoBlock title="01 类型" summary="单行单元格">
        <Single />
      </TDemoBlock>
      <TDemoBlock title="02" summary="多行单元格">
        <Multiple />
      </TDemoBlock>
      <TDemoBlock title="03 组件样式" summary="卡片单元格">
        <Group />
      </TDemoBlock>
    </div>
  );
}
