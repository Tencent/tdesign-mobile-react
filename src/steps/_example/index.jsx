import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Click from './click';
import Icon from './icon';
import Horizontal from './horizontal';
import Content from './content';

import './style/index.less';
import Vertical from './vertical';
import VerticalReadonly from './vertical-readonly';

export default function StepsDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Steps 步骤条" summary="用于用户对某个任务的时间节点" />
      <TDemoBlock title="01 类型" summary="横向可操作步骤条">
        <div className="tdesign-mobile-block">
          <Click />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="横向带图标可操作步骤条">
        <div className="tdesign-mobile-block">
          <Icon />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="横向只读步骤条">
        <Horizontal />
      </TDemoBlock>
      <TDemoBlock title="" summary="竖向只读步骤条">
        <div className="tdesign-mobile-block">
          <VerticalReadonly />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="竖向简化只读步骤条">
        <div className="tdesign-mobile-block">
          <Vertical />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="自定义内容步骤条">
        <div className="tdesign-mobile-block">
          <Content />
        </div>
      </TDemoBlock>
    </div>
  );
}
