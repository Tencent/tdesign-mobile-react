import React from 'react';
import { Link } from 'tdesign-mobile-react';

import './style/index.less';

export default function Base() {
  return (
    <div className="demo-content">
      <Link href="/mobile-react/overview">跳转链接</Link>
      <Link hover>跳转链接</Link>
    </div>
  );
}
