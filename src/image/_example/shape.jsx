import React from 'react';
import { Image } from 'tdesign-mobile-react';

const ShapeUsage = React.memo(() => (
  <div className="t-image__demo-base">
    <div className="t-image__demo-wrap">
      <h5>方形</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" shape="square" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>圆角方形</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" shape="round" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>圆形</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" shape="circle" />
    </div>
  </div>
));

export default ShapeUsage;
