import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Left from './left';
import Right from './right';
import Double from './double';
import Icon from './icon';
import Event from './event';

import './style/base.less';

export default function SwipeCellDemo() {
  return (
    <div className="swipe-cell-demo">
      <TDemoHeader
        title="SwipeCell 滑动单元格"
        summary="用来承载列表中的更多操作，通过左右滑动来展示，按钮的宽度固定高度根据列表高度而变化。"
      />
      <Left />
      <Right />
      <Double />
      <Icon />
      <Event />
    </div>
  );
}
