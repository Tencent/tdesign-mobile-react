import React, { useState } from 'react';
import { ColorObject, ColorPicker, ColorPickerTrigger } from 'tdesign-mobile-react';
import Button from 'tdesign-mobile-react/button';

export default function () {
  const [visible, setVisible] = useState<boolean>(false);
  const onChange = (value: string) => {
    console.log('change', value);
  };
  const onClose = (target: ColorPickerTrigger) => {
    console.log('close', target);
    setVisible(false);
  };
  const onPaletteBarChange = (e: { color: ColorObject }) => {
    console.log('onPaletteBarChange', e.color);
  };
  const handlePopup = () => {
    setVisible(true);
  };
  return (
    <>
      <ColorPicker
        usePopup
        enableAlpha
        visible={visible}
        type="multiple"
        onChange={onChange}
        onClose={onClose}
        onPaletteBarChange={onPaletteBarChange}
      />
      <div className="row">
        <Button block size="large" variant="outline" theme="primary" onClick={handlePopup}>
          弹窗形式的颜色选择器
        </Button>
      </div>
    </>
  );
}
