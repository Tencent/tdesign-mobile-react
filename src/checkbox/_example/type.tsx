import React from 'react';
import { Checkbox } from 'tdesign-mobile-react';

export default function () {
  const activeImage = 'https://tdesign.gtimg.com/mobile/demos/checkbox-checked.png';
  const inActiveImage = 'https://tdesign.gtimg.com/mobile/demos/checkbox.png';
  return (
    <>
      <Checkbox label="多选" value="0" icon="line" defaultChecked />
      <div style={{ height: '16px' }} />
      <Checkbox label="多选" value="1" icon="rectangle" defaultChecked />
      <div style={{ height: '16px' }} />
      <Checkbox label="图片图标" value="2" icon={[activeImage, inActiveImage]} />
    </>
  );
}
