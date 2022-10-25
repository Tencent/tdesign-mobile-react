import React from 'react';
import { Badge, Button, CellGroup, Cell } from 'tdesign-mobile-react';

export default function BadgeTextDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <div className="badge-demo">
        <Badge content="NEW" className="badge-item">
          <Button size="small">NEW</Button>
        </Badge>
        <Badge content="···" className="badge-item">
          <Button size="small">省略号</Button>
        </Badge>
      </div>
      <div className="badge-wrap">
        <CellGroup>
          <Cell align="left">
            <span>单行标题</span>
            <div className="badge-tag-wrap">
              <Badge content="NEW" shape="round" className="badge-tag" />
              <Badge content="NEW" shape="round" className="badge-tag" />
              <Badge content="NEW" shape="circle" className="badge-tag" />
              <Badge content="NEW" shape="circle" className="badge-tag" />
            </div>
          </Cell>
        </CellGroup>
      </div>
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
