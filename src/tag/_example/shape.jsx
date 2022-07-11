import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const ShapeDemo = () => (
  <div className="tag-demo">
    <Tag theme="primary" shape="round">
      圆弧
    </Tag>
    <Tag theme="primary" shape="mark">
      半圆弧
    </Tag>
  </div>
);

export default ShapeDemo;
