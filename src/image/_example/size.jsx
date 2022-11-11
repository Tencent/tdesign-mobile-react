import React from 'react';
import { Image } from 'tdesign-mobile-react';
import './style/index.less';

const SizeDemo = React.memo(() => (
  <div className="t-image__demo-size">
    <div className="t-image__demo-wrap">
      <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 56, height: 56 }} />
      <h5>图片 56</h5>
    </div>

    <div className="t-image__demo-wrap">
      <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 48, height: 48 }} />
      <h5>图片 48</h5>
    </div>

    <div className="t-image__demo-wrap">
      <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 32, height: 32 }} />
      <h5>图片 32</h5>
    </div>

    <div className="t-image__demo-wrap">
      <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 24, height: 24 }} />
      <h5>图片 24</h5>
    </div>
    <div className="t-image__demo-wrap">
      <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 120, height: 120 }} />
      <h5>图片 120</h5>
    </div>

    <div className="t-image__demo-wrap">
      <Image src="https://tdesign.gtimg.com/site/upload1.png" style={{ width: 72, height: 72 }} />
      <h5>图片 72</h5>
    </div>
  </div>
));

export default SizeDemo;
