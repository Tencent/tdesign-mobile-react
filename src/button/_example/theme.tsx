import React from 'react';
import { Button } from 'tdesign-mobile-react';

export default function () {
  return (
    <div className="section-theme">
      <div className="row">
        <Button size="large">填充按钮</Button>
        <Button size="large" variant="outline">
          描边按钮
        </Button>
        <Button size="large" variant="dashed">
          虚框按钮
        </Button>
        <Button size="large" variant="text">
          文字按钮
        </Button>
      </div>

      <div className="row">
        <Button size="large" theme="primary">
          填充按钮
        </Button>
        <Button size="large" theme="primary" variant="outline">
          描边按钮
        </Button>
        <Button size="large" theme="primary" variant="dashed">
          虚框按钮
        </Button>
        <Button size="large" theme="primary" variant="text">
          文字按钮
        </Button>
      </div>

      <div className="row">
        <Button size="large" theme="danger">
          填充按钮
        </Button>
        <Button size="large" theme="danger" variant="outline">
          描边按钮
        </Button>
        <Button size="large" theme="danger" variant="dashed">
          虚框按钮
        </Button>
        <Button size="large" theme="danger" variant="text">
          文字按钮
        </Button>
      </div>

      <div className="row">
        <Button size="large" theme="light">
          填充按钮
        </Button>
        <Button size="large" theme="light" variant="outline">
          描边按钮
        </Button>
        <Button size="large" theme="light" variant="dashed">
          虚框按钮
        </Button>
        <Button size="large" theme="light" variant="text">
          文字按钮
        </Button>
      </div>
    </div>
  );
}
