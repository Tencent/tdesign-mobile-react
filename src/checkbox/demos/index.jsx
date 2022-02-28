import React from 'react';
import Base from './base';
import Right from './right';
import Disable from './disable';
import CheckAll from './checkAll';

export default function CheckboxDemo() {
  return (
    <>
      <h2>01 类型</h2>
      <h3>基础多选框</h3>
      <Base />
      <h3>右侧圆形多选框</h3>
      <Right />
      <h3>多选框禁用态</h3>
      <Disable />
      <h3>checkAll</h3>
      <CheckAll />
    </>
  );
}
