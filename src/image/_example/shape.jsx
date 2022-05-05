import React from 'react';
import { Image } from 'tdesign-mobile-react';

const ShapeUsage = React.memo(() => (
  <div className="t-image__demo-base">
    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
      shape="square"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
      shape="round"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
      shape="circle"
    />
  </div>
));

export default ShapeUsage;
