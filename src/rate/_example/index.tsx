import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

import ActionDemo from './action';
import BaseDemo from './base';
import ColorDemo from './color';
import CountDemo from './count';
import CustomDemo from './custom';
import PlacementDemo from './placement';
import ShowTextDemo from './show-text';
import SizeDemo from './size';
import SpecialDemo from './special';

export default function RateDemo() {
  return (
    <>
      <TDemoHeader title="Rate 评分" summary="用于对某行为/事物进行打分。" />

      <TDemoBlock title="01 类型" summary="实心评分">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="自定义评分" padding={false}>
        <CustomDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="自定义数量评分" padding={false}>
        <CountDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="带描述评分" padding={false}>
        <ShowTextDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="评分弹框位置" padding={false}>
        <PlacementDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件状态" summary="只可选全星时">
        <ActionDemo allowHalf={false} />
      </TDemoBlock>
      <TDemoBlock title="" summary="可选半星时" padding={false}>
        <ActionDemo allowHalf={true} />
      </TDemoBlock>
      <TDemoBlock title="03 组件样式" summary="评分打小">
        <SizeDemo />
      </TDemoBlock>
      <TDemoBlock title="" summary="设置评分颜色" padding={false}>
        <ColorDemo />
      </TDemoBlock>
      <TDemoBlock title="04 特殊样式" summary="竖向带描述评分" padding={false}>
        <SpecialDemo />
      </TDemoBlock>

      <TDemoBlock />
    </>
  );
}
