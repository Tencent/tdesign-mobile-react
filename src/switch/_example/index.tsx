import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import Base from './base';
import Color from './color';
import Label from './label';
import Status from './status';
import Size from './size';

import './style/index.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Switch 开关" summary="开关用于切换当个设置项的状态，开启、关闭为两个互斥的操作" />
      <TDemoBlock title="01 组件类型" summary="基础开关">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="带描述开关">
        <Label />
      </TDemoBlock>
      <TDemoBlock summary="自定义颜色开关">
        <Color />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="加载状态">
        <Status />
      </TDemoBlock>
      <TDemoBlock title="03 组件样式" summary="开关尺寸">
        <Size />
      </TDemoBlock>
    </div>
  );
}
