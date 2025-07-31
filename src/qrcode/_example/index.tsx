import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import IconDemo from './icon';
import BorderlessDemo from './borderless';
import LevelDemo from './level';
import StatusDemo from './status';
import ColorDemo from './color';
import SizeDemo from './size';

import './style/index.less';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="QRCode 二维码" summary="能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置。" />
      <TDemoBlock title="01 组件类型" summary="基本用法" padding>
        <BaseDemo />
      </TDemoBlock>

      <TDemoBlock summary="带 Icon 的二维码" padding>
        <IconDemo />
      </TDemoBlock>

      <TDemoBlock summary="无边框的二维码" padding>
        <BorderlessDemo />
      </TDemoBlock>

      <TDemoBlock summary="二维码纠错等级">
        <LevelDemo />
      </TDemoBlock>

      <TDemoBlock title="02 组件状态" summary="active">
        <StatusDemo />
      </TDemoBlock>

      <TDemoBlock title="03 组件样式" summary="二维码颜色">
        <ColorDemo />
      </TDemoBlock>

      <TDemoBlock summary="二维码尺寸" padding>
        <SizeDemo />
      </TDemoBlock>
    </div>
  );
}
