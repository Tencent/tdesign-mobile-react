import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import ContentDemo from './content';
import BtnsDemo from './btns';
import EventDemo from './event';
import LeftMenuDemo from './left-menu';
import RightMenuDemo from './right-menu';
import DisabledDemo from './disabled';

import './style/base.less';

export default function SwipeCellDemo() {
  return (
    <div className="swipe-cell-demo">
      <TDemoHeader
        title="SwipeCell 滑动单元格"
        summary="用来承载列表中的更多操作，通过左右滑动来展示，按钮的宽度固定高度根据列表高度而变化。"
      />
      <ContentDemo />
      <DisabledDemo />
      <LeftMenuDemo />
      <RightMenuDemo />
      <BtnsDemo />
      <EventDemo />
    </div>
  );
}
