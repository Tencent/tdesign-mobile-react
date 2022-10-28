import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

import FilledDemo from './filled';
import OutlineDemo from './outline';
import CountDemo from './count';
import AllowHalfDemo from './allow-half';
import DisabledDemo from './disabled';
import ColorDemo from './color';
import TextDemo from './text';
import SizeDemo from './size';

import './style/index.less';

export default function RadioDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Rate 评分"
        summary="评分组件，对内容进行快速评级操作，或内容评价的等级展示，目前常用为五星实心评价"
      />
      <TDemoBlock title="01 类型" summary="实心评分">
        <FilledDemo />
      </TDemoBlock>
      <TDemoBlock summary="空心评分">
        <OutlineDemo />
      </TDemoBlock>
      <TDemoBlock summary="自定义数量评分">
        <CountDemo />
      </TDemoBlock>
      <TDemoBlock summary="半星评分">
        <AllowHalfDemo />
      </TDemoBlock>
      <TDemoBlock summary="带描述评分">
        <TextDemo />
      </TDemoBlock>
      <TDemoBlock summary="禁用评分">
        <DisabledDemo />
      </TDemoBlock>
      <TDemoBlock summary="设置评分颜色">
        <ColorDemo />
      </TDemoBlock>
      <TDemoBlock title="02 规格" summary="评价规格">
        <SizeDemo />
      </TDemoBlock>
    </div>
  );
}
