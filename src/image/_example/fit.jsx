import React from 'react';
import { Image } from 'tdesign-mobile-react';

const FitUsage = React.memo(() => (
  <div className="t-image__demo-base">
    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
      fit="cover"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
      fit="fill"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
      fit="scale-down"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
      fit="contain"
    />
  </div>
));

export default FitUsage;
