import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';

export default function Base() {
  const [value2, setValue2] = useState(3);

  return (
    <>
      <CustomCell title="请点击评分">
        <Rate
          showText={true}
          size="16"
          texts={['1分', '2分', '3分', '4分', '5分']}
          value={value2}
          color={['#ED7B2F', '#E7E7E7']}
          variant="filled"
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
          onChange={(value) => {
            setValue2(value);
          }}
        />
      </CustomCell>
    </>
  );
}
