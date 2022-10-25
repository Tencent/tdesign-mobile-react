import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import NormalDemo from './normal';
import SingleLineDemo from './single-line';
import ButtonDemo from './button';
import './style/index.less';

export default function BadgeDemo() {
  return (
    <div className="badge-demo">
      <TDemoHeader title="Badge 徽标" summary="展示新增内容的提示，用警示红色为主色，包含数字或文字提示内容" />

      <TDemoBlock title="01 普通徽标">
        <NormalDemo />
      </TDemoBlock>
      <TDemoBlock title="02 按钮徽标">
        <ButtonDemo />
      </TDemoBlock>
      <TDemoBlock title="03 单行徽标">
        <SingleLineDemo />
      </TDemoBlock>
    </div>
  );
}
