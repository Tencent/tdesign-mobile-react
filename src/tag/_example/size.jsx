import React from 'react';
import { Tag } from 'tdesign-mobile-react';
import { TagCheck } from 'tdesign-mobile-react';

const Size = React.memo(() => (
  <div className="t-tag__demo-block">
    <div className="t-tag__demo-size">
      <Tag theme="primary" size="large">
        展示标签大号
      </Tag>
      <Tag theme="primary" size="middle">
        展示标签中号
      </Tag>
      <Tag theme="primary" size="small">
        展示标签小号
      </Tag>
    </div>
    <div className="t-tag__demo-size ">
      <TagCheck size="large">点击标签大号</TagCheck>
      <TagCheck size="middle">点击标签中号</TagCheck>
    </div>
  </div>
));

export default Size;
