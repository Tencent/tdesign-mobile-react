import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import Base from './base';
import Multiple from './multiple';

export default function () {
  return (
    <div className="tdesign-mobile-demo" style={{ marginBottom: 16 }}>
      <TDemoHeader title="Upload 上传" summary="用于相册读取或拉起拍照的图片上传功能。" />
      <TDemoBlock title="01 类型" summary="单选上传图片">
        <Base />
      </TDemoBlock>
      <TDemoBlock title="" summary="多选上传图片">
        <Multiple />
      </TDemoBlock>
    </div>
  );
}
