import React from 'react';
import { CellGroup, Badge } from 'tdesign-mobile-react';

export default function BadgeBasicDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <CellGroup>
        <div className="badge-demo">
          <div className="badge-item">
            <Badge count={16}>消息</Badge>
          </div>
          <div className="badge-item">
            <Badge dot>消息</Badge>
          </div>
          <div className="badge-item">
            <Badge content="NEW">消息</Badge>
          </div>
          <div className="badge-item">
            <Badge content="···">消息</Badge>
          </div>
        </div>
      </CellGroup>
    </div>
  );
}
