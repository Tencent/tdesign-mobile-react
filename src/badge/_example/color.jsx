import React from 'react';
import { Badge, CellGroup, Button } from 'tdesign-mobile-react';

export default function BadgeColorDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <CellGroup>
        <div className="badge-demo">
          <div className="badge-item">
            <Badge count={12} className="badge-item">
              <Button size="small">按钮</Button>
            </Badge>
            <Badge count={999} color="#52c41a" className="badge-item">
              <Button size="small">绿色</Button>
            </Badge>
            <Badge count={1} color="#f52fff" className="badge-item">
              <Button size="small">自定义颜色</Button>
            </Badge>
          </div>
        </div>
      </CellGroup>
    </div>
  );
}
