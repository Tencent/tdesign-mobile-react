import React from 'react';
import { Image } from 'tdesign-mobile-react';

import './style/index.less';

const imageSrc = 'https://tdesign.gtimg.com/demo/demo-image-1.png';

export default function PositionImage() {
  return (
    <div className="image-example">
      <div className="image-example-title">不同填充位置的图片</div>
      <div className="image-example-desc">当图片过大时，提供显示图片的局部左侧对齐、或右侧对齐的不同位置。</div>
      <div className="image-group">
        <div className="image-demo">
          <p className="image-demo-tip">cover center</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="cover"
            position="center"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">cover left</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="cover"
            position="left"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">cover right</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="cover"
            position="right"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">cover top</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="cover"
            position="top"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">cover bottom</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="cover"
            position="bottom"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">contain top</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="contain"
            position="top"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">contain bottom</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="contain"
            position="bottom"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">contain center</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="contain"
            position="center"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">contain left</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="contain"
            position="left"
            src={imageSrc}
          />
        </div>
        <div className="image-demo">
          <p className="image-demo-tip">contain right</p>
          <Image
            className="image-container"
            style={{ width: '72px', height: '72px' }}
            fit="contain"
            position="right"
            src={imageSrc}
          />
        </div>
      </div>
    </div>
  );
}
