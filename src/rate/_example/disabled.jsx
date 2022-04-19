import React, { useState } from 'react';
import { Rate } from 'tdesign-mobile-react/rate';

export default function Base() {
  const [value, setValue] = useState(3);

  return (
    <Rate
      value={value}
      disabled={true}
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
}
