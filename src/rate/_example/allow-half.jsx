import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react/rate';

export default function Base() {
  const [value1, setValue1] = useState(3.5);

  return (
    <Rate
      allowHalf={true}
      value={value1}
      onChange={(value) => {
        setValue1(value);
      }}
    />
  );
}
