import React from 'react';
import { Badge, Button } from 'tdesign-mobile-react';

export default function BadgeButtonDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <div className="badge-demo">
        <div className="badge-item">
          <Badge dot>
            <Button size="small" variant="outline">
              小按钮
            </Button>
          </Badge>
        </div>
        <div className="badge-item">
          <Badge count="16">
            <Button size="small" variant="outline">
              小按钮
            </Button>
          </Badge>
        </div>

        <div className="badge-item">
          <Badge count="NEW">
            <Button size="small" variant="outline">
              小按钮
            </Button>
          </Badge>
        </div>
        <div className="badge-item">
          <Badge count="···">
            <Button size="small" variant="outline">
              小按钮
            </Button>
          </Badge>
        </div>
      </div>
    </div>
  );
}
