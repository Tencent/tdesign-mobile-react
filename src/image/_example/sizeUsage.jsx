import React from 'react';
import { Image } from 'tdesign-mobile-react';

const SizeUsage = React.memo(() => (
  <div className="t-image__demo-size">
    <div className="t-image__demo-wrap">
      <h5>图片120</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
        style={{ width: 120, height: 120 }}
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>图片72</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
        style={{ width: 72, height: 72 }}
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>图片56</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
        style={{ width: 56, height: 56 }}
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>图片48</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
        style={{ width: 48, height: 48 }}
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>图片32</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
        style={{ width: 32, height: 32 }}
      />
    </div>
    <div className="t-image__demo-wrap">
      <h5>图片24</h5>
      <Image
        src="https://cdn-we-retail.ym.tencent.com/retail-ui/components-exp/image/image-2.jpg"
        style={{ width: 24, height: 24 }}
      />
    </div>
  </div>
));

export default SizeUsage;
