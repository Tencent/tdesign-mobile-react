import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseUsage from './base';
import IconUsage from './icon';
import EventUsage from './event';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Navbar 导航栏" summary="用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方。" />
      <TDemoBlock title="基础导航栏">
        <BaseUsage />
      </TDemoBlock>

      <TDemoBlock title="带图标导航栏">
        <IconUsage />
      </TDemoBlock>

      <TDemoBlock title="事件反馈">
        <EventUsage />
      </TDemoBlock>
    </>
  );
}
