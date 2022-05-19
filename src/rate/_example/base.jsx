import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import CustomCell from './custom-cell';

export default function Base() {
  const [value1, setValue1] = useState(3);
  const [value2, setValue2] = useState(3);
  const [value3, setValue3] = useState(3);
  const [value4, setValue4] = useState(2.5);

  return (
    <>
      <TDemoHeader
        title="Rate 评分"
        summary="评分组件，对内容进行快速评级操作，或内容评价的等级展示，目前常用为五星实心评价"
      />

      <TDemoBlock title="01 类型" summary="实心评分">
        <CustomCell title="请点击评分">
          <Rate
            value={value1}
            gap={10.5}
            color={['#ED7B2F', 'rgba(0,0,0,0.26)']}
            variant="filled"
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
      <TDemoBlock title="" summary="空心评分">
        <CustomCell title="请点击评分">
          <Rate
            variant="outline"
            value={value2}
            gap={10.5}
            color={['#ED7B2F', 'rgba(0,0,0,0.26)']}
            onChange={(value) => {
              setValue2(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
      <TDemoBlock title="" summary="自定义数量评分">
        <CustomCell title="自定义数量">
          <Rate
            count={4}
            value={value3}
            gap={10.5}
            color={['#ED7B2F', 'rgba(0,0,0,0.26)']}
            variant="filled"
            onChange={(value) => {
              setValue3(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
      <TDemoBlock title="" summary="半星评分">
        <CustomCell title="半星评价">
          <Rate
            allowHalf={true}
            value={value4}
            color={['#ED7B2F', 'rgba(0,0,0,0.26)']}
            variant="filled"
            gap={10.5}
            onChange={(value) => {
              setValue4(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
    </>
  );
}
