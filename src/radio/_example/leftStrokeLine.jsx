import React, { useState } from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react/radio';
import { CheckIcon } from 'tdesign-icons-react';

export default function Base() {
  const [defaultVaule, setDefaultValue] = useState('idx1');
  return (
    <>
      <RadioGroup value={defaultVaule} onChange={(value) => setDefaultValue(value)}>
        <Radio value="idx1" label="单选" icon={[CheckIcon]}></Radio>
        <Radio
          value="idx2"
          label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
          icon={CheckIcon}
        ></Radio>
        <Radio label="单选" icon={CheckIcon} value="idx3">
          单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选
        </Radio>
      </RadioGroup>
    </>
  );
}
