import React from 'react';
import { Tag } from 'tdesign-mobile-react';

const Theme = () => (
  <div className="t-tag__demo-block t-tag__demo-theme">
    <Tag theme="primary">标签</Tag>
    <Tag theme="success">成功</Tag>
    <Tag theme="warning">警告</Tag>
    <Tag theme="danger">危险</Tag>
    <Tag theme="default">信息</Tag>
  </div>
);

export default Theme;
