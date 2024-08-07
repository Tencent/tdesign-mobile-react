import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import ThemeDemo from './theme';
import SizeDemo from './linkSize';
import UnderlineDemo from './underline';
import PrefixDemo from './prefix';
import SuffixDemo from './suffix';
import StatusDemo from './status';

import './style/index.less';

export default function LinkDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Link 链接" summary="当功能使用图标即可表意清楚时，可使用纯图标悬浮按钮，例如：添加、发布。" />
      <TDemoBlock title="01 组件类型" summary="基础文字链接" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="下划线文字链接" padding={true}>
        <UnderlineDemo />
      </TDemoBlock>
      <TDemoBlock summary="前置图标文字链接" padding={true}>
        <PrefixDemo />
      </TDemoBlock>
      <TDemoBlock summary="后置图标文字链接" padding={true}>
        <SuffixDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件状态" summary="不同主题" padding={true}>
        <ThemeDemo />
      </TDemoBlock>
      <TDemoBlock summary="禁用状态" padding={true}>
        <StatusDemo />
      </TDemoBlock>
      <TDemoBlock title="03 组件样式" summary="链接尺寸" padding={true}>
        <SizeDemo />
      </TDemoBlock>
    </div>
  );
}
