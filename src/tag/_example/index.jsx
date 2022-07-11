import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import CheckeableDemo from './checkable';
import ShapeDemo from './shape';
import ClosableDemo from './closable';
import ThemeDemo from './theme';
import VariantDemo from './variant';
import SizeDemo from './size';
import EllipsisDemo from './ellipsis';

import './style/index.less';
import IconDemo from './icon';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Tag 标签" summary="用于标记表示主体属性、类型、状态等，由底部图形和标签文字组成" />
      <TDemoBlock title="01类型" summary="基础标签">
        <ThemeDemo />
        <VariantDemo />
      </TDemoBlock>
      <TDemoBlock summary="带图标标签">
        <IconDemo />
      </TDemoBlock>
      <TDemoBlock summary="圆角标签">
        <ShapeDemo />
      </TDemoBlock>
      <TDemoBlock summary="可关闭标签">
        <ClosableDemo />
      </TDemoBlock>
      <TDemoBlock summary="超长省略标签">
        <EllipsisDemo />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="标签状态">
        <CheckeableDemo />
      </TDemoBlock>
      <TDemoBlock title="03 规格" summary="标签规格">
        <SizeDemo />
      </TDemoBlock>
    </>
  );
}
