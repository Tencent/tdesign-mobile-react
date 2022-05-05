import React, { useState } from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react/radio';

export default function Base() {
  const [defaultVaule, setDefaultValue] = useState('idx1');
  return (
    <RadioGroup value={defaultVaule} onChange={(value) => setDefaultValue(value)}>
      <Radio label="单选" value="idx1"></Radio>
      <Radio label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选" value="idx2"></Radio>
      <Radio label="单选" value="idx3">
        单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选
      </Radio>
    </RadioGroup>
  );
}
