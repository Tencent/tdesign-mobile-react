import React, { useState } from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react';

export default function Base() {
  const [defaultValue, setDefaultValue] = useState('idx0');
  return (
    <RadioGroup value={defaultValue} className="box" onChange={(value) => setDefaultValue(value)}>
      <Radio block={false} label="单选标题" value="idx0"></Radio>
      <Radio block={false} label="单选标题" value="idx1"></Radio>
      <Radio block={false} label="单选标题" value="idx2"></Radio>
    </RadioGroup>
  );
}
