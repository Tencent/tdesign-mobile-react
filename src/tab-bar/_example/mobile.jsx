import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

import BaseDemo from './base';
import BadgePropsDemo from './badge-props';
import TextDemo from './text';
import PureIconDemo from './pure-icon';
import TextSpreadDemo from './text-spread';

import './style/index.less';

function TabBarMobileDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="TabBar 标签栏" summary="移动端的主导航，用做功能模块之间的切换"></TDemoHeader>
      <TDemoBlock title="01 类型" summary="基础标签栏">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="带徽章标签栏">
        <BadgePropsDemo />
      </TDemoBlock>
      <TDemoBlock summary="纯文本标签栏">
        <TextDemo />
      </TDemoBlock>
      <TDemoBlock summary="纯图标标签栏">
        <PureIconDemo />
      </TDemoBlock>
      <TDemoBlock summary="双层级纯文本标签栏">
        <TextSpreadDemo />
      </TDemoBlock>
    </div>
  );
}

export default TabBarMobileDemo;
