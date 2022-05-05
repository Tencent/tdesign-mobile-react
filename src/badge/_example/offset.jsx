import React from 'react';
import { Badge, Button } from 'tdesign-mobile-react';

export default function BadgeOffsetDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <div className="badge-demo">
        <div className="badge-line">
          <span>offset: [10, 10]</span>
          <Badge count={12} offset={[10, 10]} className="badge-item">
            <Button size="small">按钮</Button>
          </Badge>
        </div>
        <div className="badge-line">
          <span>offset: [-10, 10]</span>
          <Badge count={12} offset={[-10, 10]} className="badge-item">
            <Button size="small">按钮</Button>
          </Badge>
        </div>
        <div className="badge-line">
          <span>offset: [-10, -10]</span>
          <Badge count={12} offset={[-10, -10]} className="badge-item">
            <Button size="small">按钮</Button>
          </Badge>
        </div>
        <div className="badge-line">
          <span>offset: [10, -10]</span>
          <Badge count={12} offset={[10, -10]} className="badge-item">
            <Button size="small">按钮</Button>
          </Badge>
        </div>
      </div>
    </div>
  );
}
