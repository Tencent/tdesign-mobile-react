import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseUsage from './base';
import ShapeUsage from './shape';
import FitUsage from './fit';
import PositionUsage from './position';
import LazyUsage from './lazy';
import LoadingUsage from './loading';
import ErrorUsage from './error';
import './style/index.less';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Image 图片" summary="用于图片展示" />
      <TDemoBlock
        title="基础用法"
      >
        <BaseUsage />
      </TDemoBlock>
      <TDemoBlock
        title="图片形状"
        summary="通过shape属性可以设置图片形状，可选项有circle|round|square，分别代表圆形、圆角方形、方形"
      >
        <ShapeUsage />
      </TDemoBlock>
      <TDemoBlock
        title="图片填充"
        summary="通过fit属性可以设置图片填充模式，可选项有contain|cover|fill|none|scale-down，效果与原生的object-fit属性一致"
      >
        <FitUsage />
      </TDemoBlock>
      <TDemoBlock title="图片位置" summary="通过position属性可以设置图片位置，效果与原生的object-position属性一致">
        <PositionUsage />
      </TDemoBlock>
      <TDemoBlock title="图片懒加载" summary="通过lazy属性来开启图片懒加载">
        <LazyUsage />
      </TDemoBlock>
      <TDemoBlock title="加载中提示" summary="组件提供了默认的加载中提示，也支持通过loading插槽自定义提示内容">
        <LoadingUsage />
      </TDemoBlock>
      <TDemoBlock title="加载失败提示" summary="组件提供了默认的加载失败提示，也支持通过error插槽自定义提示内容">
        <ErrorUsage />
      </TDemoBlock>
    </>
  );
}
