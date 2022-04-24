import React from 'react';
import { SwipeCell, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

const actionButtons = [
  {
    text: '收藏',
    theme: 'primary',
  },
  {
    text: '编辑',
    className: 'swipe-cell-action-warning-button',
  },
  {
    text: '删除',
    theme: 'danger',
  },
];

export default function Demo() {
  return (
    <TDemoBlock summary="左滑多操作">
      <SwipeCell
        style={{ height: 48 }}
        right={actionButtons}
        content={<Cell title="列表-左滑多操作" note="多操作" />}
      />
      <SwipeCell
        expanded="right"
        style={{ height: 48 }}
        right={actionButtons}
        content={<Cell title="列表-左滑多操作" note="多操作" />}
      />
    </TDemoBlock>
  );
}
