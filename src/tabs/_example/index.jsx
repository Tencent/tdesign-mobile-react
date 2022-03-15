import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Horizontal from './horizontal';
import Scroll from './scroll';
import Vertical from './vetical';
import Size from './size';
import NoLine from './noline';
import Bottom from './bottom';
import './style.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Tabs 选项卡" summary="用于切换不同场景" />
      <Horizontal></Horizontal>
      <Vertical></Vertical>
      <Scroll></Scroll>
      <Size></Size>
      <NoLine></NoLine>
      <Bottom></Bottom>
    </div>
  );
}
