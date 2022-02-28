import React from 'react';
import { Image } from 'tdesign-mobile-react';

const PositionUsage = React.memo(() => (
  <div className="t-image__demo-position">
    <div className="t-image__demo-wrap">
      <h5>top</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/60x60"
        position="top"
        fit='none'
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>right</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/60x60"
        position="right"
        fit='none'
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>bottom</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/60x60"
        position="bottom"
        fit='none'
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>left</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/60x60"
        position="left"
        fit='none'
      />
    </div>
  </div>
));

export default PositionUsage;
