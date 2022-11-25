import React from 'react';
import { Image } from 'tdesign-mobile-react';
import './style/index.less';

const CropDemo = React.memo(() => (
  <>
    <div className="t-image__demo-base">
      <div className="t-image__demo-wrap">
        <Image src="https://tdesign.gtimg.com/site/upload1.png" fit="cover" style={{ width: 72, height: 72 }} />
        <h5>裁切</h5>
      </div>
      <div className="t-image__demo-wrap">
        <Image src="https://tdesign.gtimg.com/site/upload1.png" fit="contain" style={{ width: 89, height: 72 }} />
        <h5>适应高</h5>
      </div>
      <div className="t-image__demo-wrap">
        <Image src="https://tdesign.gtimg.com/site/upload1.png" fit="fill" style={{ width: 134, height: 72 }} />
        <h5>拉伸</h5>
      </div>
    </div>
  </>
));

export default CropDemo;
