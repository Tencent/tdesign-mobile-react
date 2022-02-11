import React from 'react';
import { Badge } from 'tdesign-mobile-react';

import './style/index.less';

export default function Color() {
  return (
    <div className="base-demo">
      <div className="badge-item">
        <Badge>chilren</Badge>
      </div>
      <div className="badge-item">
        <Badge color="#52c41a" count={999} content="content">
          chilren
        </Badge>
      </div>
    </div>
  );
}
