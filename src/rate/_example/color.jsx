import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react/rate';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Base() {
  const [value, setValue] = useState(3);

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
      <TDemoBlock title="" summary="自定义颜色">
        <RenderCard title="默认颜色">
          <Rate
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </RenderCard>

        <RenderCard title="红色选中">
          <Rate
            value={value}
            color="red"
            onChange={(value) => {
              setValue(value);
            }}
          />
        </RenderCard>

        <RenderCard title="绿色未选中">
          <Rate
            value={value}
            color={['red', 'green']}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>
    </>
  );
}
