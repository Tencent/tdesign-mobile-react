import React, { useState } from 'react';
import { Icon } from 'tdesign-icons-react';
import { Radio, RadioGroup } from 'tdesign-mobile-react/radio';

export default function () {
  const [defaultValue, setDefaultValue] = useState('idx1');
  const ICON1 = <Icon className="t-icon" name="check-rectangle-filled" />;
  const ICON2 = <Icon className="t-icon" name="check-rectangle" />;
  return (
    <RadioGroup value={defaultValue} onChange={(value) => setDefaultValue(value)}>
      <Radio value="idx1" label="单选" checked icon={[ICON1, ICON2]}></Radio>
      <Radio value="idx2" label="单选" icon={[ICON1, ICON2]}></Radio>
    </RadioGroup>
  );
}
