import React from 'react';
import BaseDemo from './base';
import TopDemo from './top';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

export default function Demo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="PullDownRefresh 下拉刷新"
        summary="用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。"
      />
      <TDemoBlock title="01 类型" summary="下拉刷新大致分为顶部下拉和中间下拉">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="顶部下拉刷新">
        <TopDemo />
      </TDemoBlock>
    </div>
  );
}
