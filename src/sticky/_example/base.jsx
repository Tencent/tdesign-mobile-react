import React, { useState } from 'react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import './style/index.less'

export default function Base() {

  return (
    <div className='tdesign-mobile-demo'>
      <TDemoHeader title="Sticky 吸顶" summary="用于常驻页面顶部的信息，操作展示"/>
      <TDemoBlock title="01 类型" summary="基础吸顶">
        <div className='tdesign-demo-block-wrap'>
          11
        </div>
      </TDemoBlock>
    </div>
  );
}
