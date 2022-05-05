import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react/rate';

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
    </>
  );
}
