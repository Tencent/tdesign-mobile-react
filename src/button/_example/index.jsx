import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import BaseButtonDemo from './base';
import IconButtonDemo from './icon';
import SizeButtonDemo from './size';
import LoadingButtonDemo from './loading';
import OtherButtonDemo from './other'

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Button 按钮" summary="按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。" />
      <TDemoBlock title="01 基础按钮" summary="基础类型分为主按钮、次按钮、文字按钮。">
        <div className="button-demo">
          <BaseButtonDemo />
        </div>
        <OtherButtonDemo />
        <div className='button-demo align-center margin-right'>
          <IconButtonDemo />
        </div>
        <div className="flex align-center margin-right button-demo-loading">
          <LoadingButtonDemo />
        </div>
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="按钮禁用态">
        <div className="button-demo">
          <BaseButtonDemo disabled/>
        </div>
        <OtherButtonDemo disabled/>
        <div className='button-demo align-center margin-right'>
          <IconButtonDemo disabled/>
        </div>
        <div className="flex align-center margin-right button-demo-loading">
          <LoadingButtonDemo disabled/>
        </div>
      </TDemoBlock>

      <TDemoBlock title="03 规格" summary="按钮尺寸">
        <div className="button-demo">
          <SizeButtonDemo />
        </div>
      </TDemoBlock>
    </div>
  );
}
