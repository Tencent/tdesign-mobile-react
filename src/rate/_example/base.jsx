import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react/rate';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

export default function Base() {
  const [value1, setValue1] = useState(3);
  const [value2, setValue2] = useState(3);
  const [value3, setValue3] = useState(3);
  const [value4, setValue4] = useState(3.5);

  const RenderCard = (props) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: props.title ? '#fff' : null,
          padding: '12px 16px',
          ...props.style,
        }}
      >
        <div style={{ width: props.title ? '80px' : null, marginRight: '16px' }}>{props.title}</div>
        {props.children}
      </div>
    );
  };

  return (
    <>
      <TDemoHeader
        title="Rate 评分"
        summary="评分组件，对内容进行快速评级操作，或内容评价的等级展示，目前常用为五星实心评价"
      />

      <TDemoBlock title="01 类型" summary="实心评分">
        <RenderCard title="请点击评分">
          <Rate
            value={value1}
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>
      <TDemoBlock title="" summary="空心评分">
        <RenderCard title="请点击评分">
          <Rate
            variant="outline"
            value={value2}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>
      <TDemoBlock title="" summary="自定义数量评分">
        <RenderCard title="自定义数量">
          <Rate
            count={6}
            value={value3}
            onChange={(value) => {
              setValue3(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>
      <TDemoBlock title="" summary="半星评分">
        <RenderCard title="半星评价">
          <Rate
            allowHalf={true}
            value={value4}
            onChange={(value) => {
              setValue4(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>
    </>
  );
}
