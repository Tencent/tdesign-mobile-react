import React from 'react';
import BaseDemo from './base';
import IconDemo from './icon';
import SuffixIcon from './suffixIcon';
import Event from './event';
import CustomDemo from './custom';
import Customization from './customization';
import ThemeDemo from './theme';
import ScrollDemo from './scrolling';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

function MobileDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="NoticeBar 公告栏" summary="在导航栏下方，用于给用户显示提示消息。" />
      <TDemoBlock title="01 组件类型" summary="纯文字的公告栏">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="带图标静态公告栏">
        <IconDemo />
      </TDemoBlock>
      <TDemoBlock summary="带关闭的公告栏">
        <SuffixIcon />
      </TDemoBlock>
      <TDemoBlock summary="带入口的公告栏">
        <Event />
      </TDemoBlock>
      <TDemoBlock summary="自定样式的公告栏">
        <CustomDemo />
      </TDemoBlock>
      <TDemoBlock summary="自定义内容的公告栏">
        <Customization />
      </TDemoBlock>
      <TDemoBlock
        title="02 组件状态"
        summary="公告栏类型有普通（info）、警示（warning）、成功（success）、错误（error）"
      >
        <ThemeDemo />
      </TDemoBlock>
      <TDemoBlock title="03 可滚动的公告栏" summary="可滚动公告栏有水平 (horizontal) 和垂直 (vertical)">
        <ScrollDemo />
      </TDemoBlock>
    </div>
  );
}

export default MobileDemo;
