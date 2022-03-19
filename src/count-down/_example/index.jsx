import React from 'react';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import TypeDemo from './base';
import SpecsDemo from './specs';

export default function CountDownDemo() {
  return (
    <div>
      <TDemoHeader title="CountDown倒计时" summary="用于实时展示倒计时数值。" />
      <TypeDemo />
      <SpecsDemo />
    </div>
  );
}
