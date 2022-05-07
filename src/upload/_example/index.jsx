import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import Base from './base';
import Multiple from './multiple';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Upload 上传" summary="用于上传一个媒体资源，包含图片及视频，点击可以进行图片或视频预览" />
      <TDemoBlock title="01 类型" summary="单选上传图片">
        <Base />
      </TDemoBlock>
      <TDemoBlock title="" summary="多选上传图片">
        <Multiple />
      </TDemoBlock>
    </div>
  );
}
