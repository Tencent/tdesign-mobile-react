import React from 'react';
import { Badge } from 'tdesign-mobile-react';

import './style/index.less';

export default function Base() {
  return (
    <div className="base-demo">
      <div className="badge-item">
        <Badge dot>消息</Badge>
      </div>
      <div className="badge-item">
        <Badge count={16}>消息</Badge>
      </div>
      <div className="badge-item">
        <Badge count="NEW">消息</Badge>
      </div>
      <div className="badge-item">
        <Badge count="···">消息</Badge>
      </div>
    </div>
  );
}
