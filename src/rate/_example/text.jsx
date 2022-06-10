import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Base() {
  const [value2, setValue2] = useState(3);

  return (
    <>
      <TDemoBlock title="" summary="带描述评分">
        <CustomCell title="请点击评分">
          <Rate
            showText={true}
            size="16"
            texts={['1分', '2分', '3分', '4分', '5分']}
            value={value2}
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            gap={9.7}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </CustomCell>
        <CustomCell title="请点击评分">
          <Rate
            showText={true}
            value={value2}
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            gap={10.2}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </CustomCell>
        <CustomCell title="请点击评分">
          <Rate
            showText={true}
            value={value2}
            color={['#ED7B2F', '#E7E7E7']}
            gap={10.2}
            variant="filled"
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
      <TDemoBlock title="" summary="展示型评分">
        <CustomCell>
          <Rate value={3} variant="filled" color={['#ED7B2F', '#E7E7E7']} gap={10.2} disabled />
        </CustomCell>
      </TDemoBlock>
    </>
  );
}
