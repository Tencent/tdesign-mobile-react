import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import CropDemo from './crop';
import RoundDemo from './rounded';
import LoadingTipDemo from './loading-tip';
import LoadingErrorDemo from './loading-error';
import SizeDemo from './size';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Image 图片" summary="用于展示效果，主要为上下左右居中裁切、拉伸、平铺等方式。" />
      <TDemoBlock title="01 类型" summary="裁切样式">
        <CropDemo />
      </TDemoBlock>
      <TDemoBlock summary="圆角样式">
        <RoundDemo />
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="加载中提示">
        <LoadingTipDemo />
      </TDemoBlock>
      <TDemoBlock summary="加载失败提示">
        <LoadingErrorDemo />
      </TDemoBlock>

      <TDemoBlock title="03 规格" summary="常用图片尺寸">
        <SizeDemo />
      </TDemoBlock>
    </>
  );
}
