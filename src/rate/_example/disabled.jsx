import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react';

export default function Base() {
  const [value, setValue] = useState(3);

  return (
    <Rate
      value={value}
      disabled
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
}
