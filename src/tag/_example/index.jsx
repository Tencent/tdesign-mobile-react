import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import ClickableUse from './checkable';
import Shape from './shape';
import ClosableDemo from './closable';
import Theme from './theme';
import Variant from './variant';
import Size from './size';

import './style/index.less';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Tag标签" summary="用于标记表示主体属性、类型、状态等，由底部图形和标签文字组成" />
      <TDemoBlock title="01类型" summary="展示型标签">
        <Theme />
        <Variant />
        <Shape />
      </TDemoBlock>
      <TDemoBlock summary="可关闭标签">
        <ClosableDemo />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="标签状态">
        <ClickableUse />
      </TDemoBlock>
      <TDemoBlock title="03 规格" summary="标签规格">
        <Size />
      </TDemoBlock>
    </>
  );
}
