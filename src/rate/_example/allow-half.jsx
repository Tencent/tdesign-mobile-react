import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';

export default function Base() {
  const [value, setValue] = useState(3.5);

  return (
    <CustomCell title="半星评价">
      <Rate
        value={value}
        allowHalf
        variant="filled"
        onChange={(value) => {
          setValue(value);
        }}
      />
    </CustomCell>
  );
}
