import React from 'react';
import { Swiper, SwiperItem } from '..';

const imageCdn = 'https://tdesign.gtimg.com/mobile/demos';
const swiperList = Array.from({ length: 5 }, (_, i) => `${imageCdn}/swiper${(i % 2) + 1}.png`);

export default function () {
  const handleChange = (index: number, context: any) => {
    console.log('基础示例,页数变化到》》》', index, context);
  };

  const handleClick = (value: number) => {
    console.log('click: ', value);
  };
  return (
    <Swiper
      onChange={handleChange}
      onClick={handleClick}
      interval={3000}
      navigation={{ type: 'dots' }}
      autoplay={false}
    >
      {swiperList.map((item, index) => (
        <SwiperItem key={index}>
          <img style={{ height: '100%' }} src={item} />
        </SwiperItem>
      ))}
    </Swiper>
  );
}
