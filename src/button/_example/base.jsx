import React from 'react';
import { Button } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Button>默认按钮</Button>
      <Button theme="primary">强按钮</Button>
      <Button theme="primary" variant="outline">
        弱按钮
      </Button>
      <Button variant="outline">次按钮</Button>
      <Button theme="danger">警告按钮</Button>
      <Button theme="danger" variant="outline">
        弱警告按钮
      </Button>
      <Button theme="primary" variant="text">
        文字按钮
      </Button>
    </>
  );
}
