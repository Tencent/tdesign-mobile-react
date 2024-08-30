import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

// import './style/index.less';

export default function EmptyDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Empty 空状态" summary="用于空状态时的占位提示。" />
      <TDemoBlock summary="图标空状态"></TDemoBlock>
      <TDemoBlock summary="自定义图片空状态"></TDemoBlock>
      <TDemoBlock summary="带操作"></TDemoBlock>
    </div>
  );
}
