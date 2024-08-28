import React, { useState } from 'react';
import { Button } from 'tdesign-mobile-react';
import ImageViewer, { OnCloseContext } from '../ImageViewer';

const images = [
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
    align: 'start',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
    align: 'end',
  },
  {
    url: 'https://tdesign.gtimg.com/mobile/demos/swiper2.png',
    align: 'center',
  },
];

export default function () {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button size="large" theme="primary" variant="outline" block onClick={() => setVisible(true)}>
        基础图片预览 + 对齐方式
      </Button>

      <ImageViewer images={images} visible={visible} onClose={(c: OnCloseContext) => setVisible(c.visible)} />
    </>
  );
}
