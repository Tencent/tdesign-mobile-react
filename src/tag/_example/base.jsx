import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const BaseUse = React.memo(() => (
  <div className="t-tag__demo-common">
    <div className="t-tag__demo-block">
      <Tag theme="primary">标签</Tag>
      <Tag theme="success">成功</Tag>
      <Tag theme="warning">警告</Tag>
      <Tag theme="danger">危险</Tag>
      <Tag theme="default">信息</Tag>
    </div>
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
    <div className="t-tag__demo-block">
      <Tag theme="primary" shape="round">
        圆角
      </Tag>
      <Tag theme="primary" shape="mark">
        半圆
      </Tag>
    </div>
  </div>
));

export default BaseUse;
