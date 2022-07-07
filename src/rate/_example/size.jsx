import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import CustomCell from './custom-cell';

export default function Base() {
  const [value, setValue] = useState(3);
  const [value1, setValue1] = useState(3.5);

  return (
    <>
      <TDemoBlock title="02 规格" summary="实心评分">
        <CustomCell title="请点击评分">
          <Rate
            value={value}
            size={16}
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            onChange={(value) => {
              setValue(value);
            }}
          />
        </CustomCell>
        <CustomCell title="请点击评分">
          <Rate
            value={value}
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            onChange={(value) => {
              setValue(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
      <TDemoBlock title="" summary="空心评分">
        <CustomCell title="请点击评分">
          <Rate
            value={value}
            size={16}
            color={['#ED7B2F', '#ED7B2F']}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </CustomCell>
        <CustomCell title="请点击评分">
          <Rate
            value={value}
            color={['#ED7B2F', '#ED7B2F']}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
      <TDemoBlock title="" summary="自定义数量评分">
        <CustomCell title="自定义数量">
          <Rate
            value={value}
            count={4}
            size={16}
            variant="filled"
            color={['#ED7B2F', '#E7E7E7']}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </CustomCell>
        <CustomCell title="自定义数量">
          <Rate
            value={value}
            count={4}
            variant="filled"
            color={['#ED7B2F', '#E7E7E7']}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
      <TDemoBlock title="" summary="半星评分">
        <CustomCell title="半星评价">
          <Rate
            value={value1}
            size={16}
            allowHalf
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </CustomCell>
        <CustomCell title="半星评价">
          <Rate
            value={value1}
            allowHalf
            color={['#ED7B2F', '#E7E7E7']}
            variant="filled"
            onChange={(value) => {
              setValue1(value);
            }}
          />
        </CustomCell>
      </TDemoBlock>
      <TDemoBlock title="" summary="展示型评分">
        <CustomCell>
          <Rate value={3} variant="filled" size={16} color={['#ED7B2F', '#E7E7E7']} disabled />
        </CustomCell>
        <CustomCell>
          <Rate value={3} variant="filled" color={['#ED7B2F', '#E7E7E7']} disabled />
        </CustomCell>
      </TDemoBlock>
    </>
  );
}
