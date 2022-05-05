import React from 'react';
import { Stepper, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Base() {
  return (
    <TDemoBlock title="01 类型" summary="基本步进器">
      <Cell title="文字标题" rightIcon={<Stepper></Stepper>}></Cell>
    </TDemoBlock>
  );
}
