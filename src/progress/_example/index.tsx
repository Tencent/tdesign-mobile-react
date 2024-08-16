import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import TransitionDemo from './transition';
import LineDemo from './line';
import PlumpDemo from './plump';
import CircleDemo from './circle';
import CustomDemo from './custom';

import './style/index.less';

export default function ProgressDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Progress 进度条" summary="展示操作的当前进度" />
      <TDemoBlock title="01 类型" summary="基础进度条" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="过渡样式" padding={true}>
        <TransitionDemo />
      </TDemoBlock>
      <TDemoBlock summary="自定义颜色/圆角" padding={true}>
        <CustomDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件状态" summary="线性进度条" padding={true}>
        <LineDemo />
      </TDemoBlock>
      <TDemoBlock summary="百分比内显进度条" padding={true}>
        <PlumpDemo />
      </TDemoBlock>
      <TDemoBlock summary="环形进度条" padding={true}>
        <CircleDemo />
      </TDemoBlock>
    </div>
  );
}
