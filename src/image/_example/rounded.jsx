import React from 'react';
import { Image } from 'tdesign-mobile-react';
import './style/index.less';

const RoundDemo = React.memo(() => (
  <>
    <div className="t-image__demo-base">
      <div className="t-image__demo-wrap">
        <Image src="https://tdesign.gtimg.com/site/upload1.png" shape="square" style={{ width: 72, height: 72 }} />
        <h5>方形</h5>
      </div>
      <div className="t-image__demo-wrap">
        <Image src="https://tdesign.gtimg.com/site/upload1.png" shape="round" style={{ width: 72, height: 72 }} />
        <h5>圆角方形</h5>
      </div>
      <div className="t-image__demo-wrap">
        <Image src="https://tdesign.gtimg.com/site/upload1.png" shape="circle" style={{ width: 72, height: 72 }} />
        <h5>圆角</h5>
      </div>
    </div>
  </>
));

export default RoundDemo;
