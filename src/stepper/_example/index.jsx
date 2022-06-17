import React, { useState } from 'react';
import { Stepper, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import Base from './base';

export default function StepperDemo() {
  const [controlValue, setControlValue] = useState(999);

  const onValueChange = (v) => {
    setControlValue(v);
  };

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
        <Cell title="标题文字（单位）" rightIcon={<Stepper></Stepper>}></Cell>
      </TDemoBlock>
      <TDemoBlock summary="纯步进器">
        <div className="pure-stepper-container">
          <Stepper theme="grey" defaultValue={3}></Stepper>
        </div>
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="步进器状态">
        <Cell title="禁用" rightIcon={<Stepper disabled></Stepper>}></Cell>
      </TDemoBlock>
      <div className="cell-container">
        <Cell title="禁用(单位)" rightIcon={<Stepper disableInput step={2}></Stepper>}></Cell>
      </div>
      <div className="cell-container">
        <Cell
          title="最大值(999)"
          rightIcon={<Stepper value={controlValue} max={999} onChange={onValueChange}></Stepper>}
        ></Cell>
      </div>
      <div className="cell-container">
        <Cell title="最小值(5)" rightIcon={<Stepper min={5} defaultValue={5}></Stepper>}></Cell>
      </div>
      <div className="pure-group-container">
        <Stepper theme="grey" defaultValue={3} disabled></Stepper>
        <Stepper theme="grey"></Stepper>
        <Stepper theme="grey" defaultValue={999} max={999}></Stepper>
      </div>
    </div>
  );
}
