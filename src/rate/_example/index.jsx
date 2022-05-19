import React from 'react';
import BaseDemo from './base';
import TextDemo from './text';
import SizeDemo from './size';
import './style/index.less';

export default function RadioDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <BaseDemo />
      <TextDemo />
      <SizeDemo />
    </div>
  );
}
