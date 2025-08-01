import React from 'react';
import { Link } from 'tdesign-mobile-react';

export default function Base() {
  return (
    <div className="demo-content">
      <Link size="small" href="/mobile-react/overview">
        跳转链接
      </Link>
      <Link size="small" hover>
        跳转链接
      </Link>
    </div>
  );
}
