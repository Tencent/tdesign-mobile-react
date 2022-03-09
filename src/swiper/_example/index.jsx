import React, { useState } from 'react';
import { Swiper } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import './style/index.less';

export default function Base() {
  const [current, setCurrent] = useState(0);
  const onChange = (current, context) => {
    console.log('swiper onChange ============ ', current, context);
  };

  const handleClick = (index) => {
    setCurrent(index);
  };

  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Swiper 轮播图"
        summary="用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置"
      />
      <TDemoBlock title="01 类型" summary="轮播图的多种样式">
        <div className="tdesign-demo-block-wrap">
          <Swiper onChange={onChange} current={current} interval={3000} navigation={{ type: 'dots' }}>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/01.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/02.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/03.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/04.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/05.png" />
            </Swiper.SwiperItem>
          </Swiper>
          {/* <div className="dots-container">
            <div className="dots" onClick={() => handleClick(0)} />
            <div className="dots" onClick={() => handleClick(1)} />
            <div className="dots" onClick={() => handleClick(2)} />
          </div> */}
        </div>
        <div className="tdesign-demo-block-wrap">
          <Swiper interval={3000} autoplay={false} defaultCurrent={3} navigation={{ type: 'dots-bar' }}>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/01.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/02.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/03.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/04.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/05.png" />
            </Swiper.SwiperItem>
          </Swiper>
        </div>
        <div className="tdesign-demo-block-wrap">
          <Swiper interval={3000} autoplay={false} direction="vertical" navigation={{ type: 'fraction' }}>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/01.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/02.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/03.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/04.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/05.png" />
            </Swiper.SwiperItem>
          </Swiper>
        </div>
        <div className="tdesign-demo-block-wrap">
          <Swiper interval={3000} autoplay={false} navigation={{ showSlideBtn: true }}>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/01.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/02.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/03.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/04.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/site/swiper/05.png" />
            </Swiper.SwiperItem>
          </Swiper>
        </div>
      </TDemoBlock>
    </div>
  );
}
