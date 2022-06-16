import React, { useState } from 'react';
import { CheckRectangleFilledIcon, RectangleIcon } from 'tdesign-icons-react';
import { Radio, RadioGroup } from 'tdesign-mobile-react/radio';

export default function () {
  const [defaultValue, setDefaultValue] = useState('idx1');

  return (
    <RadioGroup value={defaultValue} onChange={(value) => setDefaultValue(value)}>
      <Radio value="idx1" label="单选" icon={[CheckRectangleFilledIcon, RectangleIcon]}></Radio>
      <Radio value="idx2" label="单选" icon={[CheckRectangleFilledIcon, RectangleIcon]}></Radio>
    </RadioGroup>
  );
}
