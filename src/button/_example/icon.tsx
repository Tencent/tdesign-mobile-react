import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function () {
  return (
    <div className="row">
      <Button theme="primary" size="large" icon={<Icon name="app" />}>
        填充按钮
      </Button>
      <Button theme="primary" size="large" loading>
        加载中
      </Button>
      <Button theme="primary" size="large" shape="square" icon={<Icon name="search" />} />
    </div>
  );
}
