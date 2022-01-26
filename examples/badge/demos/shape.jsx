import React from 'react';
import { Badge } from 'tdesign-mobile-react';

import './style/index.less';

export default function Color() {
  return (
    <div className="base-demo">
      <div className="badge-item">
        <Badge shape="round" count="NEW">
          round
        </Badge>
      </div>
      <div className="badge-item">
        <Badge shape="ribbon" count="NEW" size="small">
          ribbon
        </Badge>
      </div>
      <div className="badge-item">
        <Badge shape="circle" count="NEW">
          circle
        </Badge>
      </div>
    </div>
  );
}
