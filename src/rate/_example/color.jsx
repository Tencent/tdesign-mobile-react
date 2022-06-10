import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';

export default function Base() {
  const [value, setValue] = useState(3);

  return (
    <>
      <CustomCell title="红色选中">
        <Rate
          value={value}
          color="red"
          onChange={(value) => {
            setValue(value);
          }}
        />
      </CustomCell>

      <CustomCell title="绿色未选中">
        <Rate
          value={value}
          color={['red', 'green']}
          onChange={(value) => {
            setValue(value);
          }}
        />
      </CustomCell>
    </>
  );
}
