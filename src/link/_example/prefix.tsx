import React from 'react';
import { LinkIcon } from 'tdesign-icons-react';
import { Link } from 'tdesign-mobile-react';

export default function Prefix() {
  return (
    <div className="demo-content">
      <Link theme="primary" underline hover prefixIcon={<LinkIcon />}>
        跳转链接
      </Link>
      <Link underline hover prefixIcon={<LinkIcon />}>
        跳转链接
      </Link>
    </div>
  );
}
