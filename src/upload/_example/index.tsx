import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import BaseDemo from './base';
import MultipleDemo from './multiple';
import StatusDemo from './status';
import CustomDemo from './custom';

export default function () {
  return (
    <div className="tdesign-mobile-demo" style={{ marginBottom: 16 }}>
      <TDemoHeader title="Upload上传" summary="用于相册读取或拉起拍照的图片上传功能。" />
      <TDemoBlock title="01 类型" summary="单选上传图片">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="多选上传图片">
        <MultipleDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件状态" summary="加载状态">
        <StatusDemo />
      </TDemoBlock>
      <TDemoBlock title="03 样式自定义" summary="单选上传">
        <CustomDemo />
      </TDemoBlock>
    </div>
  );
}
