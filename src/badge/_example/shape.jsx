import React from 'react';
import { Badge } from 'tdesign-mobile-react';

import './style/index.less';

export default function Color() {
  return (
    <div className="base-demo">
      <div className="base-demo__container">
        <Badge shape="round" count="NEW">
          round
        </Badge>
      </div>
      <div className="base-demo__container">
        <Badge shape="ribbon" count="NEW" size="small">
          ribbon
        </Badge>
      </div>
      <div className="base-demo__container">
        <Badge shape="circle" count="NEW">
          circle
        </Badge>
      </div>
    </div>
  );
}
