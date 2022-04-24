import React from 'react';
import { SwipeCell, Button, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  return (
    <TDemoBlock summary="左滑双操作">
      <SwipeCell
        style={{ height: 48 }}
        right={
          <>
            <Button theme="primary">编辑</Button>
            <Button theme="danger">删除</Button>
          </>
        }
        content={<Cell title="列表-左滑双操作" note="双操作" />}
      />
      <SwipeCell
        expanded="right"
        style={{ height: 48 }}
        right={
          <>
            <Button theme="primary">编辑</Button>
            <Button theme="danger">删除</Button>
          </>
        }
        content={<Cell title="列表-左滑双操作" note="双操作" />}
      />
    </TDemoBlock>
  );
}
