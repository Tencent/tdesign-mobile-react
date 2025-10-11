import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import BaseDemo from './base';
import ImageDemo from './image';
import GaryDemo from './gray';
import MultiLineDemo from './multiLine';
import MultiLineGaryDemo from './multiLineGray';
import MovingTextDemo from './movingText';
import MovingImageDemo from './movingImage';
import LayoutDemo from './layout';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <h1 className="title">Watermark 标签</h1>
      <p className="summary">给页面的某个区域加上水印。</p>
      <TDemoBlock title="01 组件类型" summary="文本水印">
        <BaseDemo />
      </TDemoBlock>

      <TDemoBlock summary="图片水印">
        <ImageDemo />
      </TDemoBlock>

      <TDemoBlock summary="图片灰阶水印">
        <GaryDemo />
      </TDemoBlock>

      <TDemoBlock summary="多行图文水印">
        <MultiLineDemo />
      </TDemoBlock>

      <TDemoBlock summary="多行图文灰阶水印">
        <MultiLineGaryDemo />
      </TDemoBlock>

      <TDemoBlock summary="运动文字水印">
        <MovingTextDemo />
      </TDemoBlock>

      <TDemoBlock summary="运动图片水印">
        <MovingImageDemo />
      </TDemoBlock>

      <TDemoBlock title="02 组件样式" />
      <LayoutDemo />
    </div>
  );
}
