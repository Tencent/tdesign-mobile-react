import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const ClosableDemo = React.memo(() => (
  <div className="t-tag__demo-common">
    <div className="t-tag__demo-block">
      <Tag theme="primary" closable size="large">
        标签
      </Tag>
      <Tag theme="primary" closable>
        标签
      </Tag>
    </div>
  </div>
));

export default ClosableDemo;
