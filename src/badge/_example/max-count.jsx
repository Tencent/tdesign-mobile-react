import React from 'react';
import { Badge } from 'tdesign-mobile-react';

import './style/index.less';

export default function MaxCount() {
  return (
    <div className="base-demo">
      <div className="base-demo__container">
        <Badge count={16} size="small">
          消息
        </Badge>
      </div>
      <div className="base-demo__container">
        <Badge count={0} size="small">
          消息
        </Badge>
      </div>
      <div className="base-demo__container">
        <Badge count={0} showZero size="small">
          消息
        </Badge>
      </div>
      <div className="base-demo__container">
        <Badge count={100} maxCount={99} size="small">
          消息
        </Badge>
      </div>
    </div>
  );
}
