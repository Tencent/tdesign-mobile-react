import React from 'react';
import { Badge, Button } from 'tdesign-mobile-react';

import './style/index.less';

export default function Base() {
  return (
    <>
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
      <div className="base-demo">
        <div className="badge-item">
          <Badge dot color="blue">
            消息
          </Badge>
        </div>
        <div className="badge-item">
          <Badge count={16} offset={['-30px', '-30px']}>
            <Button>消息</Button>
          </Badge>
        </div>
        <div className="badge-item">
          <Badge count={11} maxCount={11} style={{ color: 'yellow' }}></Badge>
        </div>
        <div className="badge-item">
          <Badge count="···">消息</Badge>
        </div>
      </div>
    </>
  );
}
