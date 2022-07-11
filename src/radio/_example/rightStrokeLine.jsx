import React, { useState } from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react';
import { CheckIcon } from 'tdesign-icons-react';

export default function () {
  const [defaultVaule, setDefaultValue] = useState('idx1');
  const CheckedIcon = <CheckIcon key="1" color="#0052d9" />;

  return (
    <RadioGroup value={defaultVaule} onChange={setDefaultValue}>
      <Radio label="单选" align="right" icon={[CheckedIcon]} value="idx1"></Radio>
      <Radio
        label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
        align="right"
        icon={[CheckedIcon]}
        value="idx2"
      ></Radio>
      <Radio label="单选" align="right" icon={[CheckedIcon]} value="idx3">
        单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选
      </Radio>
    </RadioGroup>
  );
}
