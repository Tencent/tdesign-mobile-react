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
import './style/index.less'

export default function RadioDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Radio 单选框" summary="用于在预设的一组选项中执行单项选择，并呈现选择结果。" />

      <TDemoBlock title="01 类型" summary="左侧圆形单选框">
        <div className="radio-demo">
          <BaseDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock summary="右侧圆形单选框">
        <div className="radio-demo">
          <RightDemo />
        </div>
      </TDemoBlock>

      <TDemoBlock summary="左侧勾形单选框">
        <div className="radio-demo">
          <LeftStrokeLineDemo />
        </div>
      </TDemoBlock>

      <TDemoBlock summary="右侧勾形单选框">
        <div className="radio-demo">
          <RightStrokeLineDemo />
        </div>
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="单选框禁用状态">
        <div className="radio-demo">
          <StatusDemo />
        </div>
      </TDemoBlock>

      <TDemoBlock title="03 特殊类型" summary="自定义图标多选框">
        <div className="radio-demo">
          <IconDemo />
        </div>
      </TDemoBlock>

      <TDemoBlock title="04 规格" summary="单选框尺寸规格">
        <div className="radio-demo">
          <SizeDemo />
        </div>
      </TDemoBlock>
    </div>
  );
}
