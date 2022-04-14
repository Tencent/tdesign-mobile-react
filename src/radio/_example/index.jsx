import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import BaseDemo from './base';
import RightDemo from './right';
import LeftStrokeLineDemo from './leftStrokeLine';
import RightStrokeLineDemo from './rightStrokeLine';
import StatusDemo from './status';
import IconDemo from './icon';
import SizeDemo from './size';

export default function RadioDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Radio 单选框" summary="用于在预设的一组选项中执行单项选择，并呈现选择结果。"></TDemoHeader>

      <TDemoBlock title="01 类型" summary="左侧圆形单选框">
        <BaseDemo></BaseDemo>
      </TDemoBlock>
      <TDemoBlock summary="右侧圆形单选框">
        <RightDemo></RightDemo>
      </TDemoBlock>

      <TDemoBlock summary="左侧勾形单选框">
        <LeftStrokeLineDemo></LeftStrokeLineDemo>
      </TDemoBlock>

      <TDemoBlock summary="右侧勾形单选框">
        <RightStrokeLineDemo></RightStrokeLineDemo>
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="单选框禁用状态">
        <StatusDemo></StatusDemo>
      </TDemoBlock>

      <TDemoBlock title="03 特殊类型" summary="自定义图标多选框">
        <IconDemo></IconDemo>
      </TDemoBlock>

      <TDemoBlock title="04 规格" summary="单选框尺寸规格">
        <SizeDemo></SizeDemo>
      </TDemoBlock>
    </div>
  );
}
