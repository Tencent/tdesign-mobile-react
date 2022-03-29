import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const Ellipsis = React.memo(() => (
  <div className="t-tag__demo-common">
    <div className="t-tag__demo-block">
      <Tag theme="primary" maxWidth="80px">
        标签标签标签标签标签标签标签标签标签标签标签
      </Tag>
      <Tag theme="primary" size="middle" maxWidth="80px">
        标签标签标签标签标签标签标签标签标签标签
      </Tag>
      <Tag theme="primary" size="small" maxWidth="80px">
        标签标签标签标签标签标签标签标签标签
      </Tag>
    </div>
  </div>
));

export default Ellipsis;
