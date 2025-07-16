import React from 'react';
import { LinkIcon } from 'tdesign-icons-react';
import { Link } from 'tdesign-mobile-react';

export default function Prefix() {
  return (
    <div className="demo-content">
      <Link size="small" theme="primary" hover prefixIcon={<LinkIcon />}>
        跳转链接
      </Link>
      <Link size="small" hover prefixIcon={<LinkIcon />}>
        跳转链接
      </Link>
    </div>
  );
}
