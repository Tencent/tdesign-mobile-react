import React from 'react';
import { JumpIcon } from 'tdesign-icons-react';
import { Link } from 'tdesign-mobile-react';

export default function Suffix() {
  return (
    <div className="demo-content">
      <Link size="small" theme="primary" underline suffixIcon={<JumpIcon />}>
        跳转链接
      </Link>
      <Link size="small" underline hover suffixIcon={<JumpIcon />}>
        跳转链接
      </Link>
    </div>
  );
}
