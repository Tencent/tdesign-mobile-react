import React, { useState } from 'react';
import { CheckRectangleFilledIcon, RectangleIcon } from 'tdesign-icons-react';
import { Radio, RadioGroup } from '../index';

export default function () {
  const [defaultValue, setDefaultValue] = useState('idx2');
  const icons = [<CheckRectangleFilledIcon key="1" color="#0052d9" />, <RectangleIcon key="2" />];

  return (
    <RadioGroup value={defaultValue} onChange={(value) => setDefaultValue(value)}>
      <Radio value="idx1" label="单选" icon={icons}></Radio>
      <Radio value="idx2" label="单选" icon={icons}></Radio>
    </RadioGroup>
  );
}
