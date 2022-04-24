import React from 'react';
import { Image } from 'tdesign-mobile-react';

const ErrorUsage = React.memo(() => (
  <div className="t-image__demo-status">
    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-22222.jpg"
    />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-22222.jpg"
      error={<span style={{ fontSize: 12 }}>加载失败</span>}
    />
  </div>
));

export default ErrorUsage;
