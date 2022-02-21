import React from 'react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import BaseUsage from './baseUsage';
import SizeUsage from './sizeUsage';
import StatusUsage from './statusUsage';
import './style/index.less';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Image 图片" summary="用于图片展示" />
      <TDemoBlock title="图片类型" summary="基础图片用法">
        <BaseUsage />
      </TDemoBlock>
      <TDemoBlock title="图片状态" summary="图片加载状态">
        <StatusUsage />
      </TDemoBlock>
      <TDemoBlock title="图片规格" summary="指定图片大小">
        <SizeUsage />
      </TDemoBlock>
    </>
  );
}
