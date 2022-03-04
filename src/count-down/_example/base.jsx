import React from 'react';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TypeDemo from './type';
// import SpecsDemo from './specs';

export default function CountDownDemo() {
  return (
    <div>
      <TDemoHeader title="CountDown倒计时" summary="用于实时展示倒计时数值。" />
      <TDemoBlock title="类型" summary="动态倒计时间主要有时间数字和时分秒分割组成">
        <TypeDemo />
      </TDemoBlock>
    </div>
  );
}
