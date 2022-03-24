import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const Variant = React.memo(() => (
  <div className="t-tag__demo-block">
    <Tag theme="primary" variant="outline">
      描边
    </Tag>
    <Tag theme="primary" variant="light">
      浅色
    </Tag>
    <Tag theme="primary" variant="light-outline">
      描边浅色
    </Tag>
  </div>
));

export default Variant;
