import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base'
import NoTextDemo from './noText'
import CustomDemo from './custom';
import StrokeWidthDemo from './strokeWidth'
import StatusDemo from './status'

import './style/index.less';

export default function ProgressDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Progress 进度条" summary="展示操作的当前进度" />
      <TDemoBlock title="01 类型" summary="基础进度条">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="隐藏数值进度条">
        <NoTextDemo />
      </TDemoBlock>
      <TDemoBlock summary="自定义样式">
        <CustomDemo />
      </TDemoBlock>
      <TDemoBlock summary="自定义线宽">
        <StrokeWidthDemo />
      </TDemoBlock>
      <TDemoBlock title="02 状态">
       <StatusDemo />
      </TDemoBlock>
    </div>
  );
}
