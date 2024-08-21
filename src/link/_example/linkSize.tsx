import React from 'react';
import { Link } from 'tdesign-mobile-react';

export default function Size() {
  return (
    <div className="demo-content">
      <Link theme="primary" size="small">
        S跳转链接
      </Link>
      <Link theme="primary" size="medium">
        M跳转链接
      </Link>
      <Link theme="primary" size="large">
        L跳转链接
      </Link>
    </div>
  );
}
