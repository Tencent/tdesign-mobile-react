import React from 'react';
import './style/index.less';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import HorizontalDemo from './horizontal';
import AllDemo from './all';
import StatusDemo from './status';

export default function CheckboxDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Checkbox 多选框" summary="用于预设的一组选项中执行多项选择，并呈现选择结果。" />

      <TDemoBlock title="01 组件类型" summary="纵向多选框">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="横向多选框">
        <HorizontalDemo />
      </TDemoBlock>
      <TDemoBlock summary="带全选多选框">
        <AllDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件状态" summary="多选框状态">
        <StatusDemo />
      </TDemoBlock>
    </div>
  );
}
