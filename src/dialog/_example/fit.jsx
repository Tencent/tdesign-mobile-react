import React from 'react';
import { Image } from 'tdesign-mobile-react';

const FitUsage = React.memo(() => (
  <div className="t-image__demo-base">
    <div className="t-image__demo-wrap">
      <h5>cover</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" fit="cover" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>fill</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" fit="fill" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>scale-down</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" fit="scale-down" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>contain</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" fit="contain" />
    </div>
  </div>
));

export default FitUsage;
