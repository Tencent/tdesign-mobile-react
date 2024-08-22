import React from 'react';
import { Badge, Button, Cell } from 'tdesign-mobile-react';
import { NotificationIcon, ShopIcon } from 'tdesign-icons-react';

export default function ThemeBadge() {
  return (
    <>
      <div className="summary">圆形徽标</div>
      <div className="badge-demo">
        <Badge count="2" offset={[-2, -2]}>
          <NotificationIcon size="24" />
        </Badge>
      </div>

      <div className="summary">方形徽标</div>
      <div className="badge-demo">
        <Badge count="2" shape="square" offset={[-2, -2]}>
          <NotificationIcon size="24" />
        </Badge>
      </div>

      <div className="summary">气泡徽标</div>
      <div className="badge-demo">
        <Badge count="领积分" shape="bubble">
          <Button icon={<ShopIcon />} shape="square" size="large" />
        </Badge>
      </div>

      <div className="summary" style={{ marginBottom: '16px' }}>
        角标
      </div>
      <Cell title="单行标题" note={<Badge count="New" offset={[0, 0]} shape="ribbon" />}></Cell>
    </>
  );
}
