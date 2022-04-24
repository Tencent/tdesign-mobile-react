import React, { useState } from 'react';
import { SwipeCell, Button, Switch, Cell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  const [expanded, setExpanded] = useState(false);
  return (
    <TDemoBlock summary="通过 expanded 实现父子组件联动">
      <Cell title="开关" rightIcon={<Switch value={expanded} onChange={setExpanded} />}></Cell>
      <SwipeCell
        expanded={expanded ? 'right' : undefined}
        style={{ height: 48 }}
        right={<Button theme="danger">删除</Button>}
        content={<Cell title="父子组件联动" />}
      />
    </TDemoBlock>
  );
}
