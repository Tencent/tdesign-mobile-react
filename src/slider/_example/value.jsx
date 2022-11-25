import React, { useState } from 'react';
import { Slider } from 'tdesign-mobile-react';

export default function ValueDemo() {
  const [value, setValue] = useState(50);
  const onChange = (value) => {
    setValue(value);
  };

  return <Slider label value={value} onChange={onChange} />;
}
