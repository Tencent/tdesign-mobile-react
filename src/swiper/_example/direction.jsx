import React from 'react';
import { Swiper } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Swiper direction="vertical">
        <Swiper.SwiperItem>
          <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper1.png" />
        </Swiper.SwiperItem>
        <Swiper.SwiperItem>
          <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper2.png" />
        </Swiper.SwiperItem>
        <Swiper.SwiperItem>
          <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper1.png" />
        </Swiper.SwiperItem>
      </Swiper>
    </>
  );
}
