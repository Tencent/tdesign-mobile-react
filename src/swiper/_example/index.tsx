import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

import Base from './base';
import Control from './control';

export default function DemoIndex() {
  return (
    <div className="tdesign-mobile-demo demo-swiper">
      <TDemoHeader
        title="Swiper 轮播图"
        summary="用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置"
        padding
      />
      <TDemoBlock title="01 组件类型" summary="点状（dots）">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="条状（dots-bar）">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="分式（fraction）">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="切换按钮（controls）">
        <Control />
      </TDemoBlock>
      <TDemoBlock summary="手动跳转（current）">
        <Base />
      </TDemoBlock>
      <TDemoBlock title="02 组件样式" summary="垂直模式">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="outside模式">
        <Base />
      </TDemoBlock>
    </div>
  );
}
