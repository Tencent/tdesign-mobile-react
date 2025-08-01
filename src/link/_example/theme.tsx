import React from 'react';
import { Link } from 'tdesign-mobile-react';
import { JumpIcon } from 'tdesign-icons-react';

import './style/index.less';

export default function Theme() {
  return (
    <>
      <div className="demo-content">
        <Link size="small" theme="primary" suffixIcon={<JumpIcon />}>
          跳转链接
        </Link>
        <Link size="small" suffixIcon={<JumpIcon />}>
          跳转链接
        </Link>
        <Link size="small" theme="danger" suffixIcon={<JumpIcon />}>
          跳转链接
        </Link>
      </div>
      <div className="demo-content">
        <Link size="small" theme="success" suffixIcon={<JumpIcon />}>
          跳转链接
        </Link>
        <Link size="small" theme="warning" suffixIcon={<JumpIcon />}>
          跳转链接
        </Link>
      </div>
    </>
  );
}
