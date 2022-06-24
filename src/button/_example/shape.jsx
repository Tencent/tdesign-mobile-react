import React from 'react';
import { Button } from 'tdesign-mobile-react';

export default function () {
  return (
    <div className="button-demo">
      <Button shape="rectangle" theme="primary">长方形</Button>
      <Button shape="square" theme="primary">正方形</Button>
    </div>
  );
}
