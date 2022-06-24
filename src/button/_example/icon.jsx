import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function () {
  return (
    <div className="button-demo">
      <Button icon={<Icon name="add" />}>图标按钮</Button>
      <Button theme="primary" icon={<Icon name="scan" />}>图标按钮</Button>
    </div>
  );
}
