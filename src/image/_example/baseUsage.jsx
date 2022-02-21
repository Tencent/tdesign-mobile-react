import React from 'react';
import { Image } from 'tdesign-mobile-react';

const BaseUsage = React.memo(() => (
  <div className="t-image__demo-base">
    <div className="t-image__demo-wrap">
      <h5>裁切</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" fit="cover" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>适应高</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
        className="height-fix"
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>拉伸</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" className="fill" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>方形</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" shape="square" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>圆角方形</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" shape="round" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>圆形</h5>
      <Image src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg" shape="circle" />
    </div>
  </div>
));

export default BaseUsage;
