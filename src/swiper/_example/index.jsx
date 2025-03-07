import React from 'react';
import { Swiper } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

export default function Base() {
  const onChange = (current, context) => {
    console.log('swiper onChange ============ ', current, context);
  };

  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Swiper 轮播图"
        summary="用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置"
      />
      <TDemoBlock title="01 类型" summary="轮播图的多种样式">
        <div className="tdesign-demo-block-wrap">
          <Swiper onChange={onChange} interval={3000} navigation={{ type: 'dots' }}>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper1.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper2.png" />
            </Swiper.SwiperItem>
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
        </div>
        <div className="tdesign-demo-block-wrap">
          <Swiper interval={3000} autoplay={true} defaultCurrent={3} navigation={{ type: 'dots-bar' }}>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper1.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper2.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper1.png" />
            </Swiper.SwiperItem>
            {/* <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper2.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper1.png" />
            </Swiper.SwiperItem> */}
          </Swiper>
        </div>
        <div className="tdesign-demo-block-wrap">
          <Swiper interval={3000} autoplay={false} direction="vertical" navigation={{ type: 'fraction' }}>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper1.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper2.png" />
            </Swiper.SwiperItem>
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
        </div>
        <div className="tdesign-demo-block-wrap">
          <Swiper interval={3000} autoplay={false} navigation={{ showSlideBtn: true }}>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper1.png" />
            </Swiper.SwiperItem>
            <Swiper.SwiperItem>
              <img style={{ height: '100%' }} src="https://tdesign.gtimg.com/mobile/demos/swiper2.png" />
            </Swiper.SwiperItem>
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
        </div>
      </TDemoBlock>
    </div>
  );
}
