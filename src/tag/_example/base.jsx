import React from 'react';
import { Tag } from 'tdesign-mobile-react';
import Theme from './theme';
import Variant from './variant';

const BaseUse = React.memo(() => (
  <div className="t-tag__demo-common">
    <Theme />
    <Variant />
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
