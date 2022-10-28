import React from 'react';
import TypeDemo from './type';
import StatusDemo from './status';
import SpecialDemo from './special';
import SizeDemo from './size';
import AlignDemo from './align';
import LimitDemo from './limit';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style/index.less';

export default function RadioDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Input 输入框" summary="空状态时的占位提示。" />

      <TDemoBlock title="01 类型">
        <TypeDemo />
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="文本框状态">
        <StatusDemo />
      </TDemoBlock>

      <TDemoBlock title="03 特殊类型" summary="特殊文本框类型">
        <SpecialDemo />
      </TDemoBlock>

      <TDemoBlock title="04 规格" summary="文本框尺寸规格">
        <SizeDemo />
      </TDemoBlock>

      <TDemoBlock title="05 内容位置" summary="文本框内容位置">
        <AlignDemo />
      </TDemoBlock>

      <TDemoBlock title="06 字数限制" summary="文本框字数限制">
        <LimitDemo />
      </TDemoBlock>
    </div>
  );
}
