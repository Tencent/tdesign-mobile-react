import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';

export default function Base() {
  const [value, setValue] = useState(3);
  const [value1, setValue1] = useState(2.5);

  return (
    <>
      <CustomCell title="空心评分">
        <Rate
          value={value}
          color={['#FFC51C', '#E8E8E8']}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </CustomCell>

      <CustomCell title="实心评分">
        <Rate
          value={value1}
          variant="filled"
          allowHalf
          color={['#FFC51C', '#E8E8E8']}
          onChange={(value) => {
            setValue1(value);
          }}
        />
      </CustomCell>
    </>
  );
}
