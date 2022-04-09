import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
import Cascade from './cascade';

export default function PickerDemo() {
  return (
    <div className="picker-demo" style={{ paddingBottom: 12 }}>
      <TDemoHeader
        title="Picker 选择器"
        summary="用于选择一个地区的省、市、区、街道等，包含树形用于多层级地区选择以及行政区单层选择"
      />
      <Base />
      <Cascade />
    </div>
  );
}
