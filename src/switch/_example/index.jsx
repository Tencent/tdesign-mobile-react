import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import Base from './base';
import Desc from './desc';
import Disabled from './disabled';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Switch 开关" summary="开关用于切换当个设置项的状态，开启、关闭为两个互斥的操作" />
      <TDemoBlock title="01 类型" summary="基础开关">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="带描述信息开关">
        <Desc />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="开关状态">
        <Disabled />
      </TDemoBlock>
    </div>
  );
}
