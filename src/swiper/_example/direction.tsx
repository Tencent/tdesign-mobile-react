import React from 'react';
import { Swiper } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Swiper direction="vertical">
        <Swiper.SwiperItem>
          <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/01.png" />
        </Swiper.SwiperItem>
        <Swiper.SwiperItem>
          <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/02.png" />
        </Swiper.SwiperItem>
        <Swiper.SwiperItem>
          <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/03.png" />
        </Swiper.SwiperItem>
      </Swiper>
    </>
  );
}
