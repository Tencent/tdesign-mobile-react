import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

import BaseDemo from './base';
import CombinationDemo from './combination';
import ThemeDemo from './theme';
import CopyableDemo from './copyable';
import EllipsisDemo from './ellipsis';

export default function TypographyDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Typography 排版" summary="用于定义页面中文本的基本格式，包括标题、正文及辅助文本等。" />
      <TDemoBlock title="01 基础排版" summary="基础文本">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="组合用法">
        <CombinationDemo />
      </TDemoBlock>
      <TDemoBlock summary="主题样式">
        <ThemeDemo />
      </TDemoBlock>
      <TDemoBlock summary="可复制">
        <CopyableDemo />
      </TDemoBlock>
      <TDemoBlock summary="文本省略">
        <EllipsisDemo />
      </TDemoBlock>
    </div>
  );
}
