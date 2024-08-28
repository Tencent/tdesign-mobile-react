import React, { useState } from 'react';
import { Button } from 'tdesign-mobile-react';
import ImageViewer, { OnCloseContext } from '../ImageViewer';

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
];

export default function () {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button size="large" theme="primary" variant="outline" block onClick={() => setVisible(true)}>
        带操作图片预览
      </Button>

      <ImageViewer
        images={images}
        visible={visible}
        onClose={(c: OnCloseContext) => setVisible(c.visible)}
        showIndex
        deleteBtn
      />
    </>
  );
}
