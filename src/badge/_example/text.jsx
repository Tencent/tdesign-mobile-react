import React from 'react';
import { Badge } from 'tdesign-mobile-react';

import './style/index.less';

export default function Color() {
  return (
    <div className="base-demo">
      <div className="base-demo__container">
        <Badge>children</Badge>
      </div>
      <div className="base-demo__container">
        <Badge color="#52c41a" count={999} content="content">
          children
        </Badge>
      </div>
    </div>
  );
}
