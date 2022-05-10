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
      <TDemoBlock title="02 规格" summary="评价规格">
        <RenderCard title="评分 20" style={{ marginBottom: '16px' }}>
          <Rate
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </RenderCard>
        <RenderCard title="评分 16" style={{ marginBottom: '64px' }}>
          <Rate
            value={value}
            size={16}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </RenderCard>
      </TDemoBlock>
    </>
  );
}
