import React from 'react';
import { Link } from 'tdesign-mobile-react';

export default function Underline() {
  return (
    <div className="demo-content">
      <Link theme="primary" underline>
        跳转链接
      </Link>
      <Link underline hover>
        跳转链接
      </Link>
    </div>
  );
}
