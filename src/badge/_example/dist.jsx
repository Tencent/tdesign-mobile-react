import React from 'react';
import { Badge, CellGroup, Cell, Button } from 'tdesign-mobile-react';

export default function BadgeDistDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <div className="badge-wrap">
        <Badge dot className="badge-item">
          <Button size="small">按钮</Button>
        </Badge>
      </div>
      <div className="badge-wrap">
        <CellGroup>
          <Cell align="left">
            <span>单行标题</span>
            <Badge dot offset={[10, 0]} className="list-item-badge" />
          </Cell>
        </CellGroup>
      </div>
    </div>
  );
}
