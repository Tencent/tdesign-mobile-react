import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react/rate';

export default function Base() {
  const [value, setValue] = useState(3);

  return (
    <Rate
      count={6}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
}
