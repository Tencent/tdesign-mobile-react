import React from 'react';
import { Switch, Cell, CellGroup } from 'tdesign-mobile-react';

export default function () {
  return (
    <CellGroup>
      <Cell title="开关" note={<Switch />}></Cell>
      <Cell title="开关" note={<Switch defaultValue={true} />}></Cell>
      <Cell title="自定义颜色" note={<Switch defaultValue colors={['#00A870']} />}></Cell>
    </CellGroup>
  );
}
