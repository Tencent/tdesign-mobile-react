import React, { useState } from 'react';
import { SwipeCell, Button, Switch, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  const [disabled, onDisabledChange] = useState(false);
  return (
    <TDemoBlock summary="是否启用滑动功能">
      <Cell title="开关" rightIcon={<Switch value={disabled} onChange={onDisabledChange} />}></Cell>
      <SwipeCell
        disabled={disabled}
        style={{ height: 48 }}
        right={<Button theme="danger">删除</Button>}
        content={<Cell title="是否启用滑动功能" />}
      />
    </TDemoBlock>
  );
}
