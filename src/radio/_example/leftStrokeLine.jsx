import React, { useState } from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react';
import { CheckIcon } from 'tdesign-icons-react';

export default function Base() {
  const [defaultValue, setDefaultValue] = useState('idx0');
  const CheckedIcon = <CheckIcon key="1" color="#0052d9" />;
  return (
    <>
      <RadioGroup value={defaultValue} onChange={(value) => setDefaultValue(value)}>
        <Radio value="idx0" label="单选" icon={[CheckedIcon]}></Radio>
        <Radio value="idx1" label="单选" icon={[CheckedIcon]}></Radio>
        <Radio
          value="idx2"
          label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
          icon={[CheckedIcon]}
        ></Radio>
        <Radio label="单选" icon={[CheckedIcon]} value="idx3">
          单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选
        </Radio>
      </RadioGroup>
    </>
  );
}
