import React from 'react';
import { Image } from 'tdesign-mobile-react';
import './style/index.less';

const imageSrc = 'https://tdesign.gtimg.com/mobile/demos/image1.jpeg';

export default function BaseImage() {
  return (
    <div className="image-example">
      <div className="image-group">
        <div className="image-demo">
          <p className="image-demo-tip">默认居中</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="cover"
            position="center"
            src={imageSrc}
          ></Image>
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">左对齐</p>
          <Image
            className="image-container"
            style={{ height: '72px', width: 'auto' }}
            fit="fill"
            position="left"
            src={imageSrc}
          ></Image>
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">右对齐</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="fill"
            position="right"
            src={imageSrc}
          ></Image>
        </div>
      </div>
    </div>
  );
}
