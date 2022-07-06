import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import BaseDemo from './display';

export default function FabDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Fab 悬浮按钮"
        summary="当功能使用图标即可表示清楚时，可使用纯图标悬浮按钮，例如：添加、发布"
      />

      <TDemoBlock title="01 类型" summary="纯图标悬浮按钮">
        <BaseDemo />
      </TDemoBlock>
    </div>
  );
}
