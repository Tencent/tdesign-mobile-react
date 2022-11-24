import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';
import CustomCell from './custom-cell';

export default function Base() {
  const [value, setValue] = useState(3);

  return (
    <>
      <CustomCell title="规格20" showBottom>
        <Rate
          value={value}
          variant="filled"
          onChange={(value) => {
            setValue(value);
          }}
        />
      </CustomCell>
      <CustomCell title="规格16" showBottom>
        <Rate
          value={value}
          size={16}
          variant="filled"
          onChange={(value) => {
            setValue(value);
          }}
        />
      </CustomCell>
    </>
  );
}
