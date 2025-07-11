import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseDemo from './base';
import LinksDemo from './links';
import LogoDemo from './logo';

import './style/index.less';

export default function FooterDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Footer 页脚" summary="用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。" />
      <TDemoBlock summary="基础页脚">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="基础加链接页脚">
        <LinksDemo />
      </TDemoBlock>
      <TDemoBlock summary="品牌页脚">
        <LogoDemo />
      </TDemoBlock>
    </div>
  );
}
