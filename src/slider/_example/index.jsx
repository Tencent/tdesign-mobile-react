import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

import BaseDemo from './base';
import ValueDemo from './value';
import UnZeroDemo from './unZero';
import MarkDemo from './mark';
import RangDemo from './range';
import DisableDemo from './disable';
import TitleDemo from './title';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Slider 滑动选择器" summary="用于选择横轴上的数值、区间、档位" />
      <TDemoBlock title="01 类型" summary="基础滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <BaseDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="带数值滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <ValueDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="起始非零滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <UnZeroDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="带刻度滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <MarkDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="区间滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <RangDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="滑动选择器禁用状态">
        <div className="tdesign-demo-block-wrap">
          <DisableDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="03 规格" summary="无标题滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <BaseDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="有标题滑动选择器">
        <div className="tdesign-demo-block-wrap tdesign-demo-block-wrap-flex">
          <TitleDemo />
        </div>
      </TDemoBlock>
    </div>
  );
}
