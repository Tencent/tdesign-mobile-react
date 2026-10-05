import React, { useState } from 'react';
import { ColorPicker } from 'tdesign-mobile-react';

export default function () {
  const [value, setValue] = useState('linear-gradient(90deg, rgba(241,29,0,1) 0%, rgba(73,106,220,1) 100%)');

  return (
    <ColorPicker
      type="multiple"
      colorModes={['monochrome', 'linear-gradient']}
      value={value}
      onChange={(value) => setValue(value)}
    />
  );
}
