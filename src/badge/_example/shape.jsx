import React from 'react';
import { Badge, Button, CellGroup, Cell } from 'tdesign-mobile-react';

export default function BadgeShapeDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <div className="badge-demo">
        <Badge count={12} className="badge-item">
          <Button size="small">circle</Button>
        </Badge>
        <Badge count={12} shape="round" className="badge-item">
          <Button size="small">round</Button>
        </Badge>
        <CellGroup title="列表带徽标">
          <Cell label="单行标题">
            <Badge dot />
          </Cell>
          <Cell label="单行标题">
            <Badge content="NEW" offset={[5, 0]} shape="ribbon" />
          </Cell>
        </CellGroup>
      </div>
    </div>
  );
}
