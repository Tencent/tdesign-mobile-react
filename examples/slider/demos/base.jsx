import React, { useState } from 'react';
import { Slider } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import './style/index.less'

export default function Base() {

  return (
    <div className='tdesign-mobile-demo'>
      <TDemoHeader title="Slider 滑动选择器" summary="滑动滑块来选择一个数值，在具体场景中也可以增加来刻度和展示数值来方便用户使用"/>
      <TDemoBlock title="类型" summary="基础滑动选择器">
        <div className='tdesign-demo-block-wrap'>
          <Slider />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="带数值滑动选择器">
        <div className='tdesign-demo-block-wrap'>
          <Slider showValue />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="起始非零滑动选择器">
        <div className='tdesign-demo-block-wrap'>
          <Slider showValue min={30} value={30}/>
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="带刻度滑动选择器">
        <div className='tdesign-demo-block-wrap'>
          <Slider marks={{ 0: '小', 50: '中', 100: '大' }} value={0}/>
        </div>
      </TDemoBlock>
    </div>
  );
}
