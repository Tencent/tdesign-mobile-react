import React from 'react';
import { Button } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Button>默认按钮</Button>
      <Button theme="primary">重要按钮</Button>
      <Button theme="danger">警告按钮</Button>
    </>
  );
}
