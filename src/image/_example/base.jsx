import React from 'react';
import { Image } from 'tdesign-mobile-react';

const BaseUsage = React.memo(() => (
  <div className="t-image__demo-base">
    <Image
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg?imageMogr2/thumbnail/1000x"
      alt="这是一张图片"
      style={{ width: 72, height: 72 }}
    />
  </div>
));

export default BaseUsage;
