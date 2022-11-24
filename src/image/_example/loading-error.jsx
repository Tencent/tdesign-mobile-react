import React from 'react';
import { Image } from 'tdesign-mobile-react';
import './style/index.less';

const LoadingErrorDemo = React.memo(() => (
  <>
    <div className="t-image__demo-base">
      <div className="t-image__demo-wrap">
        <Image src="https://tdesign.gtimg.com/site/upload111.png" style={{ width: 72, height: 72 }} />
        <h5>默认提示</h5>
      </div>
      <div className="t-image__demo-wrap">
        <Image
          src="https://tdesign.gtimg.com/site/upload1111.png"
          error={<span style={{ fontSize: 12 }}>加载失败</span>}
          style={{ width: 72, height: 72 }}
        />
        <h5>自定义提示</h5>
      </div>
    </div>
  </>
));

export default LoadingErrorDemo;
