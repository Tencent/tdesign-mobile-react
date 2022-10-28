import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';

export default function Base() {
  const [value, setValue] = useState(3);

  return (
    <CustomCell title="请点击评分">
      <Rate
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
    </CustomCell>
  );
}
