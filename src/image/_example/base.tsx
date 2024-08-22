import React from 'react';
import { Image } from 'tdesign-mobile-react';

const imageSrc = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

export default function BaseImage() {
  return (
    <div className="image-example">
      <div className="image-example-title">不同填充模式的图片</div>
      <div className="image-example-desc">提供 fill、contain、cover、none、scale-down 5 种填充类型。</div>
      <div className="image-group">
        <div className="image-demo">
          <p className="image-demo-tip">fill</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="fill"
            src={imageSrc}
          ></Image>
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">contain</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="contain"
            src={imageSrc}
          ></Image>
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">cover</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="cover"
            src={imageSrc}
          ></Image>
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">none</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="none"
            src={imageSrc}
          ></Image>
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">scale-down</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="scale-down"
            src={imageSrc}
          ></Image>
        </div>
      </div>
    </div>
  );
}
