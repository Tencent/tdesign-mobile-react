import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
import ImageList from './imageList';
import InitialIndex from './initialIndex';
import Background from './background';

import './style/index.less';

export default function ImageViewerDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="ImageViewer 图片预览"
        summary="图片全屏放大预览效果，包含全屏背景色、页码位置样式、增加操作等规范"
      />

      <TDemoBlock title="01 类型" summary="图片预览类型">
        <div className="image-viewer-block">
          {/* 基础图片预览 */}
          <Base />
          {/* 有删除操作 */}
          <ImageList />
          {/* 图片超高情况 */}
          <InitialIndex />
          {/* 图片超宽情况 */}
          <Background />
        </div>
        <div style={{ height: '1000px' }}></div>
      </TDemoBlock>
    </div>
  );
}
