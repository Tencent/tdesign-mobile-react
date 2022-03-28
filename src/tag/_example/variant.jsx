import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const Variant = React.memo(() => (
  <div className="t-tag__demo-block t-tag__demo-common">
    <Tag theme="primary" variant="outline">
      镂空标签
    </Tag>
    <Tag theme="primary" variant="light">
      浅底标签
    </Tag>
    <Tag theme="primary" variant="light-outline">
      标签
    </Tag>
  </div>
));

export default Variant;
