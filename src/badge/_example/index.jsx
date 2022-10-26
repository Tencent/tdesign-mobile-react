import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import ButtonDemo from './button';
import CellDemo from './cell';
import './style/index.less';

export default function BadgeDemo() {
  return (
    <div className="badge-demo">
      <TDemoHeader title="Badge 徽标" summary="用于告知用户，该区域的状态变化或者待处理任务的数量。" />
      <TDemoBlock title="01 类型" summary="徽标主要分红点、数字、文字和角标提醒">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock>
        <ButtonDemo />
      </TDemoBlock>
      <TDemoBlock>
        <CellDemo />
      </TDemoBlock>
    </div>
  );
}
