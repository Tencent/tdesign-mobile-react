import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

import Single from './single';
import Multiple from './multiple';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Grid 宫格"
        summary="一行内容/功能的垂直排列方式。一行项目左侧为主要内容展示区域，右侧可增加更多操作内容。"
      />
      <TDemoBlock title="01 类型" summary="单行单元格">
        <Single />
      </TDemoBlock>
      <TDemoBlock title="" summary="多行单元格">
        <Multiple />
      </TDemoBlock>
    </div>
  );
}
