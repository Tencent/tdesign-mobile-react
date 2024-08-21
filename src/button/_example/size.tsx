import React from 'react';
import { Button } from 'tdesign-mobile-react';

export default function () {
  return (
    <div className="row section-size">
      <Button size="large" theme="primary">
        按钮 48
      </Button>
      <Button theme="primary">按钮 40</Button>
      <Button size="small" theme="primary">
        按钮 32
      </Button>
      <Button size="extra-small" theme="primary">
        按钮 28
      </Button>
    </div>
  );
}
