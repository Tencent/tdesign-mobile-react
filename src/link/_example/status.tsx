import React from 'react';
import { Link } from 'tdesign-mobile-react';
import { JumpIcon } from 'tdesign-icons-react';

import './style/index.less';

export default function Status() {
  return (
    <>
      <div className="demo-content">
        <Link size="small" theme="primary" suffixIcon={<JumpIcon />} disabled>
          跳转链接
        </Link>
        <Link size="small" suffixIcon={<JumpIcon />} disabled>
          跳转链接
        </Link>
        <Link size="small" theme="danger" suffixIcon={<JumpIcon />} disabled>
          跳转链接
        </Link>
      </div>
      <div className="demo-content">
        <Link size="small" theme="success" suffixIcon={<JumpIcon />} disabled>
          跳转链接
        </Link>
        <Link size="small" theme="warning" suffixIcon={<JumpIcon />} disabled>
          跳转链接
        </Link>
      </div>
    </>
  );
}
