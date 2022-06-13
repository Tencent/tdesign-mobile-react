import React from 'react';
import BaseDemo from './base';
import DefaultDemo from './default';
import ClickDemo from './click';
import StateDemo from './state';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

export default function RadioDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Search 搜索框" summary="用于用户输入搜索信息，并进行页面内容搜索" />
      <TDemoBlock title="01 类型" summary="基础搜索框">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="默认状态">
        <DefaultDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="点击状态">
        <ClickDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="输入状态">
        <StateDemo />
      </TDemoBlock>
    </div>
  );
}
