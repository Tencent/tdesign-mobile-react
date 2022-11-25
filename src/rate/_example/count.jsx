import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';

export default function Base() {
  const [value, setValue] = useState(3);

  return (
    <CustomCell title="自定义数量">
      <Rate
        value={value}
        count={4}
        variant="filled"
        onChange={(value) => {
          setValue(value);
        }}
      />
    </CustomCell>
  );
}
