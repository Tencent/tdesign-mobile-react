import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import Base from './base';
import Label from './label';
import Autosize from './autosize';
import Events from './events';
import Status from './status';
import Maxlength from './maxlength';
import Maxcharacter from './maxcharacter';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Textarea 多行文本框" summary="用于多行文本的输入" />
      <TDemoBlock title="01 类型" summary="基础多行文本框">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="带标题多行文本框">
        <Label />
      </TDemoBlock>
      <TDemoBlock summary="自动增高多行文本框">
        <Autosize />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="禁用多行文本框">
        <Status />
      </TDemoBlock>
      <TDemoBlock title="03 字符限制" summary="设置最大字符个数">
        <Maxlength />
      </TDemoBlock>
      <TDemoBlock summary="设置最大字符个数，一个汉字表示两个字符">
        <Maxcharacter />
      </TDemoBlock>
      <TDemoBlock title="04 事件" summary="带事件文本框">
        <Events />
      </TDemoBlock>
    </div>
  );
}
