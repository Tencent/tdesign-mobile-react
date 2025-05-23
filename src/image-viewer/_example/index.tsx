import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import AlignDemo from './align';
import OperationDemo from './operation';
import './style/index.less';

export default function ImageViewerDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="ImageViewer 图片预览"
        summary="图片全屏放大预览效果，包含全屏背景色、页码位置样式、增加操作等规范"
      />
      <TDemoBlock title="01 组件类型" summary="图片预览类型" padding={true}>
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件类型" summary="图片预览类型，可设置垂直对齐方式" padding={true}>
        <AlignDemo />
      </TDemoBlock>
      <TDemoBlock title="03 组件类型" summary="带操作图片预览" padding={true}>
        <OperationDemo />
      </TDemoBlock>
    </div>
  );
}
