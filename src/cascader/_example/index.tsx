import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';

import './style/index.less';

export default function CascaderDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Cascader 级联选择器" summary="用于多层级数据选择，主要为树形结构，可展示更多的数据。" />
      <TDemoBlock title="01 基础" summary="基础用法" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="选项卡风格" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="02 进阶" summary="带初始值" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="自定义keys" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="使用次级标题" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="异步加载" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="选择任意一项" padding={true}>
        <BaseDemo />
      </TDemoBlock>
    </div>
  );
}
