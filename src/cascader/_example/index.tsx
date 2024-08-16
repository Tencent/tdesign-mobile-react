import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import CheckStrictlyDemo from './check-strictly';
import KeysDemo from './keys';
import ThemeTabDemo from './theme-tab';
import WithTitleDemo from './with-title';
import WithValueDemo from './with-value';

import './style/index.less';

export default function CascaderDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Cascader 级联选择器" summary="用于多层级数据选择，主要为树形结构，可展示更多的数据。" />
      <TDemoBlock title="01 基础" summary="基础用法">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="选项卡风格">
        <ThemeTabDemo />
      </TDemoBlock>
      <TDemoBlock title="02 进阶" summary="带初始值">
        <WithValueDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="自定义keys">
        <KeysDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="使用次级标题">
        <WithTitleDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="选择任意一项">
        <CheckStrictlyDemo />
      </TDemoBlock>
    </div>
  );
}
