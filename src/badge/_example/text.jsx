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
    </div>
  );
}
