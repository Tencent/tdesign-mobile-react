import React from 'react';
import { Image } from 'tdesign-mobile-react';

const LazyUsage = React.memo(() => (
  <div className="t-image__demo-base">
    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/1000x"
      lazy
    />
  </div>
));

export default LazyUsage;
