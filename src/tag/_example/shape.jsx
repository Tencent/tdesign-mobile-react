import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const Shape = () => (
  <div className="t-tag__demo-block t-tag__demo-common">
    <Tag theme="primary" shape="round">
      圆角标签
    </Tag>
    <Tag theme="primary" shape="mark">
      半圆角标签
    </Tag>
  </div>
);

export default Shape;
