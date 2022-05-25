import React from 'react';
import { Image } from 'tdesign-mobile-react';

const PositionUsage = React.memo(() => (
  <div className="t-image__demo-position">
    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/60x60"
      position="top"
      fit="none"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/60x60"
      position="right"
      fit="none"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/60x60"
      position="bottom"
      fit="none"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/60x60"
      position="left"
      fit="none"
    />
  </div>
));

export default PositionUsage;
