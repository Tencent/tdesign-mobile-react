import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const VariantDemo = () => (
  <div className="tag-demo">
    <Tag theme="primary" variant="dark">
      深色
    </Tag>
    <Tag theme="primary" variant="light">
      浅色
    </Tag>
    <Tag theme="primary" variant="outline">
      描边
    </Tag>
    <Tag theme="primary" variant="light-outline">
      浅色描边
    </Tag>
  </div>
);

export default VariantDemo;
