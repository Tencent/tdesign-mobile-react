import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import CustomCell from './custom-cell';

export default function Base() {
  const [value, setValue] = useState(3);

  return (
    <>
      <TDemoBlock title="02 规格" summary="评价规格">
        <CustomCell title="评分 20">
          <Rate
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
            color={['#ED7B2F', 'rgba(0,0,0,0.26)']}
            gap={10.5}
          />
        </CustomCell>
        <CustomCell title="评分 16">
          <Rate
            value={value}
            size="16"
            color={['#ED7B2F', 'rgba(0,0,0,0.26)']}
            onChange={(value) => {
              setValue(value);
            }}
            gap={10}
          />
        </CustomCell>
      </TDemoBlock>
    </>
  );
}
