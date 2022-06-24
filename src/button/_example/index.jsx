import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

import BaseButtonDemo from './base';
import IconButtonDemo from './icon';
import SizeButtonDemo from './size';
import ShapButtonDemo from './shape';
import TypeButtonDemo from './type'
import LoadingButtonDemo from './loading';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Button 按钮" summary="按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。" />
      <TDemoBlock title="01 基础按钮" summary="基础类型分为主按钮、次按钮、文字按钮。">
        <BaseButtonDemo />
      </TDemoBlock>

      <TDemoBlock title="02 图标按钮" summary="图标按钮分为图标加文字形式、纯图标形式">
        <IconButtonDemo />
      </TDemoBlock>

      <TDemoBlock title="03 禁用按钮" summary="不可用状态">
        <BaseButtonDemo disabled />
      </TDemoBlock>

      <TDemoBlock title="04 加载中" summary="按钮处于加载状态">
        <LoadingButtonDemo />
      </TDemoBlock>

      <TDemoBlock title="05 尺寸" summary="提供大、中、小 3 种不同大小按钮">
        <SizeButtonDemo />
      </TDemoBlock>

      <TDemoBlock title="06 形状">
        <ShapButtonDemo />
      </TDemoBlock>

      <TDemoBlock title="07 类型">
        <TypeButtonDemo />
      </TDemoBlock>
    </div>
  );
}
