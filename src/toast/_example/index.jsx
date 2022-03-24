import React from 'react';
import Base from './base';
import Other from './other';
import Mask from './mask';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Toast 轻提示" />
      <Base />
      <Other />
      <Mask />
    </div>
  );
}
