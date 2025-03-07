import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import MultipleDemo from './multiple';
import RangeDemo from './range';
import CustomTextDemo from './custom-text';
import CustomButtonDemo from './custom-button';
import CustomRangeDemo from './custom-range';
import WithoutPopupDemo from './without-popup';
import './style/index.less';

export default function CheckboxDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Calendar 日历" summary="按照日历形式展示数据或日期的容器" />
      <TDemoBlock title="01 组件类型">
        <BaseDemo />
        <MultipleDemo />
        <RangeDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件样式" summary="可以自由定义想要的风格">
        <CustomTextDemo />
        <CustomButtonDemo />
        <CustomRangeDemo />
      </TDemoBlock>
      <TDemoBlock summary="不使用 Popup">
        <WithoutPopupDemo />
      </TDemoBlock>
    </div>
  );
}
