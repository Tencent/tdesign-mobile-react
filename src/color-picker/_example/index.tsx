import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import Base from './base';
import Multiple from './multiple';
import UsePopup from './usePopup';
import Format from './format';
import './style/index.less';

export default function ColorPickerDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="ColorPicker 颜色选择器" summary="用于颜色选择，支持多种格式。" />

      <TDemoBlock title="01 类型" desc="基础颜色选择器">
        <Base />
      </TDemoBlock>

      <TDemoBlock desc="带色板的颜色选择器">
        <Multiple />
      </TDemoBlock>

      <TDemoBlock desc="弹窗形式的颜色选择器">
        <UsePopup />
      </TDemoBlock>

      <TDemoBlock title="02 组件状态" summary="组件模式选择">
        <Format />
      </TDemoBlock>
    </div>
  );
}
