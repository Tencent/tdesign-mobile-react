import React from 'react';
import { Badge } from 'tdesign-mobile-react';

import './style/index.less';

export default function Color() {
  return (
    <div className="base-demo">
      <div className="badge-item">
        <Badge>正常</Badge>
      </div>
      <div className="badge-item">
        <Badge color="#52c41a" count={999}>
          绿色
        </Badge>
      </div>
      <div>
        <Badge color="#f52fff" count={1}>
          自定义颜色
        </Badge>
      </div>
    </div>
  );
}
