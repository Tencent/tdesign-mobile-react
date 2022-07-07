import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

import Base from './base';
import Horizontal from './horizontal';
import Scroll from './scroll';
import Vertical from './vertical';
import Size from './size';
import NoLine from './noline';
import Bottom from './bottom';
import './style.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Tabs 选项卡" summary="用于切换不同场景" />
      <TDemoBlock title="01 类型" summary="横向选项卡">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="超过屏幕滚动">
        <Scroll />
      </TDemoBlock>
      <NoLine></NoLine>
      <Horizontal></Horizontal>
      <TDemoBlock title="03 特殊类型" summary="竖向选项卡">
        <Vertical />
      </TDemoBlock>
      <Bottom></Bottom>
      <Size></Size>
    </div>
  );
}
