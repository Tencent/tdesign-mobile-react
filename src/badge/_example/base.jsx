import React from 'react';
import { Badge } from 'tdesign-mobile-react';

export default function BadgeNormalDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <div className="badge-demo">
        <div className="badge-item">
          <Badge dot>消息</Badge>
        </div>
        <div className="badge-item">
          <Badge count="16">消息</Badge>
        </div>
        <div className="badge-item">
          <Badge count="NEW">消息</Badge>
        </div>
        <div className="badge-item">
          <Badge count="···">消息</Badge>
        </div>
      </div>
    </div>
  );
}
