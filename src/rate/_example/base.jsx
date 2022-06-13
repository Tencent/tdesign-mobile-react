import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import CustomCell from './custom-cell';

export default function Base() {
  const [value1, setValue1] = useState(3);
  const [value2, setValue2] = useState(2.5);

  return (
    <>
      <TDemoHeader
        title="Rate 评分"
        summary="评分组件，对内容进行快速评级操作，或内容评价的等级展示，目前常用为五星实心评价"
      />
      <TDemoBlock title="01 类型" summary="基础评分">
        <CustomCell title="请点击评分">
          <Rate
            value={value1}
            gap={9.7}
            size={16}
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </CustomCell>
        <CustomCell title="请点击评分">
          <Rate
            value={value1}
            gap={10.2}
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </CustomCell>
        <CustomCell title="请点击评分">
          <Rate
            value={value1}
            gap={10.2}
            color={['#ED7B2F', '#ED7B2F']}
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </CustomCell>
        <CustomCell title="自定义数量">
          <Rate
            value={value1}
            gap={10.2}
            count={4}
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </CustomCell>
        <CustomCell title="半星评价">
          <Rate
            value={value2}
            gap={10.2}
            allowHalf
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
    </>
  );
}
