import React from 'react';
import { Badge, CellGroup, Cell, Button } from 'tdesign-mobile-react';

export default function BadgeMaxCountDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <div className="badge-demo">
        <Badge count={12} maxCount={44} className="badge-item">
          <Button size="small">14</Button>
        </Badge>
        <Badge count={109} className="badge-item">
          <Button size="small">默认max:99</Button>
        </Badge>
        <Badge count={45} maxCount={44} className="badge-item">
          <Button size="small">max:44</Button>
        </Badge>
        <Badge count={106} maxCount={105} className="badge-item">
          <Button size="small">max:105</Button>
        </Badge>
      </div>
      <div className="badge-demo">
        <CellGroup>
          <Cell align="left">
            <span>单行标题</span>
            <Badge count={16} offset={[10, 0]} className="list-item-badge" />
          </Cell>
        </CellGroup>
      </div>
    </div>
  );
}
