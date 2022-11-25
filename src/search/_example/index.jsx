import React from 'react';
import BaseDemo from './base';
import StatusDemo from './status';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

export default function RadioDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Search 搜索框" summary="用于用户输入搜索信息，并进行页面内容搜索" />
      <TDemoBlock title="01 类型">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock title="02 状态">
        <StatusDemo />
      </TDemoBlock>
    </div>
  );
}
