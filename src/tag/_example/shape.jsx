import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const Shape = React.memo(() => (
  <div className="t-tag__demo-common">
    <div className="t-tag__demo-block">
      <Tag theme="primary" size="large">
        标签
      </Tag>
      <Tag theme="primary" size="middle">
        标签
      </Tag>
      <Tag theme="primary" size="small">
        标签
      </Tag>
    </div>
    <div className="t-tag__demo-block">
      <Tag theme="primary" shape="round" size="large">
        标签
      </Tag>
      <Tag theme="primary" shape="round" size="middle">
        标签
      </Tag>
      <Tag theme="primary" shape="round" size="small">
        标签
      </Tag>
    </div>
    <div className="t-tag__demo-block">
      <Tag theme="primary" shape="mark" size="large">
        标签
      </Tag>
      <Tag theme="primary" shape="mark" size="middle">
        标签
      </Tag>
      <Tag theme="primary" shape="mark" size="small">
        标签
      </Tag>
    </div>
  </div>
));

export default Shape;
