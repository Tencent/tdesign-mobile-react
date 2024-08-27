import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
import Action from './action';
import Accordion from './accordion';

export default function CheckboxDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Collapse 折叠面板" summary="可以折叠/展开的内容区域。" />

      <TDemoBlock title="01 类型" summary="基础面板">
        <Base />
      </TDemoBlock>

      <TDemoBlock summary="带操作说明">
        <Action />
      </TDemoBlock>

      <TDemoBlock summary="手风琴模式">
        <Accordion />
      </TDemoBlock>
    </div>
  );
}
