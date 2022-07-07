import React, { useState } from 'react';
import { Slider } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

export default function Base() {
  const [value, setValue] = useState(60);

  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Slider 滑动选择器"
        summary="滑动滑块来选择一个数值，在具体场景中也可以增加来刻度和展示数值来方便用户使用"
      />
      <TDemoBlock title="01 类型" summary="基础滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <Slider label={false} defaultValue={65} />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="带数值滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <Slider
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="起始非零滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <Slider min={30} defaultValue={30} />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="带刻度滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <Slider label={false} marks={{ 0: '小', 50: '中', 100: '大' }} defaultValue={50} />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="区间滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <Slider showExtremeValue defaultValue={[30, 70]} range />
        </div>
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="滑动选择器禁用状态">
        <div className="tdesign-demo-block-wrap">
          <Slider defaultValue={60} disabled />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="带刻度滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <Slider marks={{ 0: '小', 50: '中', 100: '大' }} defaultValue={50} disabled />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="区间滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <Slider showExtremeValue defaultValue={[30, 70]} range disabled />
        </div>
      </TDemoBlock>
      <TDemoBlock title="03 规格" summary="无标题滑动选择器">
        <div className="tdesign-demo-block-wrap">
          <Slider defaultValue={65} />
        </div>
      </TDemoBlock>
      <TDemoBlock title="" summary="有标题滑动选择器">
        <div className="tdesign-demo-block-wrap tdesign-demo-block-wrap-flex">
          <div className="tdesign-demo-block-wrap__title">选择器标题</div>
          <div className="tdesign-demo-block-wrap__slider">
            <Slider defaultValue={65} title="选择器标题" />
          </div>
        </div>
      </TDemoBlock>
    </div>
  );
}
