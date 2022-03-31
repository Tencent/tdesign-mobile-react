import React, { useState } from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react/radio';

export default function Base() {
  const [defaultVaule, setDefaultValue] = useState('idx1');
  return (
    <>
      <RadioGroup value={defaultVaule} onChange={(value) => setDefaultValue(value)}>
        <Radio value="idx1" label="单选" icon="stroke-line"></Radio>
        <Radio
          value="idx2"
          label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
          icon="stroke-line"
        ></Radio>
        <Radio label="单选" icon="stroke-line" value="idx3">
          单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选
        </Radio>
      </RadioGroup>
    </>
  );
}
