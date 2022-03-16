import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TypeDemo from './type';
import SpecsDemo from './specs';

export default function CountDownDemo() {
  return (
    <div>
      <TDemoHeader title="CountDown倒计时" summary="用于实时展示倒计时数值。" />
      <TDemoBlock title="类型">
        <TypeDemo />
      </TDemoBlock>
      <TDemoBlock title="规格">
        <SpecsDemo />
      </TDemoBlock>
    </div>
  );
}
