import React from 'react';
import { SwipeCell, Button, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  return (
    <TDemoBlock summary="右滑单操作">
      <SwipeCell
        style={{ height: 48 }}
        left={<Button theme="danger">删除</Button>}
        content={<Cell title="列表-右滑单操作" note="辅助信息" />}
      />
      <SwipeCell
        expanded="left"
        style={{ height: 48 }}
        left={<Button theme="danger">删除</Button>}
        content={<Cell title="列表-右滑单操作" note="辅助信息" />}
      />
    </TDemoBlock>
  );
}
