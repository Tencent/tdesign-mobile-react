import React from 'react';
import { Tag } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

const IconDemo = () => (
  <>
    <Tag theme="primary" shape="round" icon={<Icon name="app" />}>
      标签
    </Tag>
  </>
);

export default IconDemo;
