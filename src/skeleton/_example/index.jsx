import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import ThemeSkeleton from './theme';
import AnimationSkeleton from './animation';
import CellGroupSkeleton from './cell-group';
import GridSkeleton from './grid';
import ImageGroupSkeleton from './image-group';

import './style/index.less';

export default function SkeletonDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Skeleton 骨架屏"
        summary="用当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。"
        padding={true}
      />
      <TDemoBlock title="01 类型" padding={true}>
        <ThemeSkeleton />
      </TDemoBlock>
      <TDemoBlock summary="单元格骨架屏" padding={true}>
        <CellGroupSkeleton />
      </TDemoBlock>
      <TDemoBlock summary="宫格骨架屏" padding={true}>
        <GridSkeleton />
      </TDemoBlock>
      <TDemoBlock summary="图文组合骨架屏" padding={true}>
        <ImageGroupSkeleton />
      </TDemoBlock>
      <TDemoBlock title="02 组件动效" padding={true}>
        <AnimationSkeleton />
      </TDemoBlock>
    </div>
  );
}
