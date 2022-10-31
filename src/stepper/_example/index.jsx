import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import Base from './base';
import UnitStepper from './unit-stepper';
import PureStepper from './pure-stepper';
import StatusStepper from './status';

export default function StepperDemo() {
  return (
    <div className="stepper-container">
      <TDemoHeader
        title="Stepper 步进器"
        summary="用户通过调整“+”按钮、“-”按钮、数字输入框来调整具体需要的数值，可设置最大值和最小值"
      />

      <TDemoBlock title="01 类型" summary="基本步进器">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="带单位步进器">
        <UnitStepper />
      </TDemoBlock>
      <TDemoBlock summary="纯步进器">
        <PureStepper />
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="步进器状态">
        <StatusStepper />
      </TDemoBlock>
    </div>
  );
}
