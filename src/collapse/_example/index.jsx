import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
import More from './more';
import Disable from './disable';
import ExpandIcon from './expandIcon';
import Accordion from './accordion';
import Control from './control';
import Destroy from './destroy';

export default function CheckboxDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Collapse 折叠面板" summary="可以折叠/展开的内容区域。" />

      <TDemoBlock title="基础面板">
        <Base />
      </TDemoBlock>

      <TDemoBlock title="禁用操作">
        <Disable />
      </TDemoBlock>

      <TDemoBlock title="自定义展开图标">
        <ExpandIcon />
      </TDemoBlock>

      <TDemoBlock title="互斥展开">
        <Accordion />
      </TDemoBlock>

       <TDemoBlock title="受控展开">
        <Control />
      </TDemoBlock>

      <TDemoBlock title="默认全部展开">
        <More />
      </TDemoBlock>

      <TDemoBlock title="销毁面板内容">
        <Destroy />
      </TDemoBlock>
    </div>
  );
}
