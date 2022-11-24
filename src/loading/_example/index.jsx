import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
import Horz from './horz';
import Vert from './vert';
import PureText from './pure-text';
import Bar from './bar';
import Delay from './delay';
import Size from './size';
import Speed from './speed';

import './style/index.less';

export default function () {
  return (
    <>
      <TDemoHeader
        title="Loading 加载"
        summary="用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。"
      />
      <TDemoBlock title="01 类型" summary="纯icon">
        <Base />
      </TDemoBlock>
      <TDemoBlock summary="icon加文字横向">
        <Horz />
      </TDemoBlock>
      <TDemoBlock summary="icon加文字竖向">
        <Vert />
      </TDemoBlock>
      <TDemoBlock summary="纯文字">
        <PureText />
      </TDemoBlock>
      <TDemoBlock summary="进度条加载">
        <Bar />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="延迟加载">
        <Delay />
      </TDemoBlock>
      <TDemoBlock title="03 加载速度" summary="加载速度可配置，加载一周的时间单位（毫秒）">
        <Speed />
      </TDemoBlock>

      <TDemoBlock title="04 规格" summary="支持自定义加载规格">
        <Size />
      </TDemoBlock>
    </>
  );
}
