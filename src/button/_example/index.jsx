import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import BaseButtonDemo from './base';
import SizeButtonDemo from './size';
import StatusButtonDemo from './status';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Button 按钮" summary="按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。" />
      <TDemoBlock title="01 基础按钮" summary="基础类型分为主按钮、次按钮、文字按钮。">
        <BaseButtonDemo />
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="按钮禁用态">
        <StatusButtonDemo />
      </TDemoBlock>

      <TDemoBlock title="03 规格" summary="按钮尺寸">
        <div className="button-demo">
          <SizeButtonDemo />
        </div>
      </TDemoBlock>
    </div>
  );
}
