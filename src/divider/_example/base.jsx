import React from 'react';
import { Divider } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import Content from './content';
import Normal from './normal';
import NormalDashed from './normal-dashed';
import PureContent from './pure-content';

import './style/index.less';
import Vertical from './vertical';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Divider 分割线" summary="用于分割、组织、细化有一定逻辑的组织元素内容和页面结构。" />
      <TDemoBlock title="01 类型" summary="直线拉通">
        <Normal></Normal>
      </TDemoBlock>
      <TDemoBlock summary="虚线拉通">
        <NormalDashed></NormalDashed>
      </TDemoBlock>
      <TDemoBlock summary="左右间距">
        <div className="t-demo1">
          <NormalDashed></NormalDashed>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="右侧拉通">
        <div className="t-demo2">
          <NormalDashed></NormalDashed>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="定义左侧距离">
        <div className="t-demo3">
          <NormalDashed></NormalDashed>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="垂直分割">
        <Vertical></Vertical>
      </TDemoBlock>
      <TDemoBlock summary="文字+直线">
        <div className="t-demo1">
          <Content></Content>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="文字+虚线">
        <div className="t-demo1">
          <Divider align="center" dashed>
            文字信息
          </Divider>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="纯文字">
        <div className="t-demo1">
          <PureContent></PureContent>
        </div>
      </TDemoBlock>
    </div>
  );
}
