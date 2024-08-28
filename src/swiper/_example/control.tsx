import React, { useState } from 'react';
import { Swiper } from 'tdesign-mobile-react';

export default function () {
  const [current, setCurrent] = useState(0);
  const onChange = (current, context) => {
    console.log(current, context);
  };

  const handleClick = (index) => {
    setCurrent(index);
  };
  return (
    <div className="tdesign-demo-block-wrap">
      <Swiper onChange={onChange} current={current}>
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
      <div className="dots-container">
        <div className="dots" onClick={() => handleClick(0)} />
        <div className="dots" onClick={() => handleClick(1)} />
        <div className="dots" onClick={() => handleClick(2)} />
      </div>
    </div>
  );
}
