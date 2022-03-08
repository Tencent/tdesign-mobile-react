import React from 'react';
import { Image } from 'tdesign-mobile-react';

const LazyUsage = React.memo(() => (
  <div className="t-image__demo-base">
    <div className="t-image__demo-wrap">
      <h5>懒加载图片</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/1000x"
        lazy
      />
    </div>
  </div>
));

export default LazyUsage;
