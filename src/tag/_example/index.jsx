import React from 'react';
import { TagCheck } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import CheckeableDemo from './checkable';
import ShapeDemo from './shape';
import ClosableDemo from './closable';
import ThemeDemo from './theme';
import VariantDemo from './variant';
import SizeDemo from './size';
import EllipsisDemo from './ellipsis';

import './style/index.less';
import IconDemo from './icon';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Tag 标签" summary="用于标记表示主体属性、类型、状态等，由底部图形和标签文字组成" />
      <TDemoBlock title="01类型" summary="基础标签">
        <div className="tag-demo">
          <ThemeDemo />
        </div>
        <div className="tag-demo">
          <VariantDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock summary="带图标标签">
        <div className="tag-demo">
          <IconDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock summary="圆角标签">
        <div className="tag-demo">
          <ShapeDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock summary="可关闭标签">
        <div className="tag-demo">
          <ClosableDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock summary="超长省略标签">
        <div className="tag-demo">
          <EllipsisDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="标签状态">
        <div className="tag-demo">
          <CheckeableDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="03 规格" summary="标签规格">
        <div className="group padding-bottom d-flex">
          <SizeDemo />
        </div>

        <div className="group d-flex">
          <TagCheck size="large">点击标签30</TagCheck>
          <TagCheck size="medium">点击标签24</TagCheck>
        </div>
      </TDemoBlock>
    </>
  );
}
