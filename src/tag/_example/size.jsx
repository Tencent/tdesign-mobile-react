import React from 'react';
import { Tag, TagCheck } from 'tdesign-mobile-react';

const SizeDemo = () => (
  <div>
    <div className="group padding-bottom d-flex">
      <Tag theme="primary" size="large">
        展示标签30
      </Tag>
      <Tag theme="primary" size="medium">
        展示标签24
      </Tag>
      <Tag theme="primary" size="small">
        展示标签20
      </Tag>
    </div>
    <div className="group d-flex">
      <TagCheck size="large">点击标签30</TagCheck>
      <TagCheck size="medium">点击标签24</TagCheck>
    </div>
  </div>
);

export default SizeDemo;
