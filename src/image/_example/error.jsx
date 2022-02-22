import React from 'react';
import { Image } from 'tdesign-mobile-react';

const ErrorUsage = React.memo(() => (
  <div className="t-image__demo-status">
    <div className="t-image__demo-wrap">
      <h5>失败默认提示</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-22222.jpg" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>失败自定义提示</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-22222.jpg"
        error={<span style={{ fontSize: 12 }}>加载失败</span>}
      />
    </div>
  </div>
));

export default ErrorUsage;
