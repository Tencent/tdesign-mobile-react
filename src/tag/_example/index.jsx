import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import BaseUsage from './base';
import ClickableUse from './click-able';
import Shape from './shape';
import ClosableDemo from './close-able';

import './style/index.less';

export default function Base() {
  return (
    <>
      {/* <TDemoHeader title="类型" summary="展示型标签" /> */}
      <TDemoBlock title="类型" summary="展示型标签">
        <BaseUsage />
      </TDemoBlock>
      <TDemoBlock summary="点击型标签">
        <ClickableUse />
      </TDemoBlock>
      <TDemoBlock title="规格" summary="展示型标签">
        <Shape />
      </TDemoBlock>
      <TDemoBlock summary="可关闭标签">
        <ClosableDemo />
      </TDemoBlock>
    </>
  );
}
