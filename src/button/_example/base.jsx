import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function ({ disabled }) {
  return (
    <>
      <Button size="large" shape="rectangle" theme="primary" block disabled={disabled}>强按钮</Button>
      <Button size="large" theme="primary" shape="rectangle" variant="outline" block disabled={disabled}>
        弱按钮
      </Button>
      <Button size="large" variant="outline" shape="rectangle" block disabled={disabled}>次按钮</Button>
      <Button icon={<Icon name="app" />} shape="rectangle" theme="primary" block disabled={disabled}>带图标按钮</Button>
      <Button size="large" theme="danger" shape="rectangle" block disabled={disabled}>强警告按钮</Button>
      <Button size="large" theme="danger" shape="rectangle" variant="outline" block disabled={disabled}>
        弱警告按钮
      </Button>
    </>
  );
}
