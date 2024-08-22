import React from 'react';
import { Image } from 'tdesign-mobile-react';

const imageSrc = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

export default function RoundDemo() {
  return (
    <div className="image-example">
      <div className="image-example-title">不同形状的图片</div>
      <div className="image-example-desc">
        提供方形、圆角方形、圆角 3 种形状。 当图片长宽不相等时，无法使用 circle 展示一个正圆。
      </div>
      <div className="image-group">
        <div className="image-demo">
          <p className="image-demo-tip">方形</p>
          <Image className="image-container" src={imageSrc} />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">圆角方形</p>
          <Image className="image-container" src={imageSrc} shape="round" />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">圆形</p>
          <Image className="image-container" alt="一张图片" src={imageSrc} fit="cover" shape="circle" />
        </div>
      </div>
    </div>
  );
}
