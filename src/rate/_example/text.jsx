import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react/rate';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Base() {
  const [value1, setValue1] = useState(3.5);
  const [value2, setValue2] = useState(3);
  const [value3, setValue3] = useState(3);

  const RenderCard = (props) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: props.title ? '#fff' : null,
          padding: '12px 16px',
        }}
      >
        <div style={{ width: props.title ? '80px' : null, marginRight: '16px' }}>{props.title}</div>
        {props.children}
      </div>
    );
  };

  return (
    <>
      <TDemoBlock title="" summary="带描述评分">
        <RenderCard title="请点击评分">
          <Rate
            showText={true}
            texts={['1分', '2分', '3分', '4分', '5分']}
            value={value2}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>

        <RenderCard title="请点击评分">
          <Rate
            showText={true}
            value={value2}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>

        <RenderCard title="请点击评分">
          <Rate
            showText={true}
            value={value2}
            variant="outline"
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>

      <TDemoBlock title="" summary="展示型评分">
        <RenderCard title="">
          <Rate
            value={value2}
            variant="outline"
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>

      <TDemoBlock title="02 规格" summary="实心评分">
        <RenderCard title="请点击评分">
          <Rate
            value={value2}
            size={10}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>

        <RenderCard title="请点击评分">
          <Rate
            value={value2}
            size={30}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>

      <TDemoBlock title="" summary="空心评分">
        <RenderCard title="请点击评分">
          <Rate
            value={value2}
            size={10}
            variant="outline"
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>

        <RenderCard title="请点击评分">
          <Rate
            value={value2}
            size={30}
            variant="outline"
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>

      <TDemoBlock title="" summary="自定义数量">
        <RenderCard title="请点击评分">
          <Rate
            count={4}
            value={value3}
            size={10}
            variant="outline"
            onChange={(value) => {
              setValue3(value);
            }}
          />
        </RenderCard>

        <RenderCard title="请点击评分">
          <Rate
            value={value3}
            count={4}
            size={30}
            variant="outline"
            onChange={(value) => {
              setValue3(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>

      <TDemoBlock title="" summary="半星评分">
        <RenderCard title="请点击评分">
          <Rate
            allowHalf={true}
            value={value1}
            size={10}
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </RenderCard>

        <RenderCard title="请点击评分">
          <Rate
            allowHalf={true}
            value={value1}
            size={30}
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>

      <TDemoBlock title="" summary="展示型评分">
        <RenderCard title="">
          <Rate
            value={value2}
            size={10}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>
        <RenderCard title="">
          <Rate
            value={value2}
            size={30}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>
    </>
  );
}
