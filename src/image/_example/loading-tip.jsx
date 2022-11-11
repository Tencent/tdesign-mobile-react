import React from 'react';
import { Image } from 'tdesign-mobile-react';
import { LoadingIcon } from 'tdesign-icons-react';
import './style/index.less';

const LoadingTipDemo = React.memo(() => (
  <>
    <div className="t-image__demo-base">
      <div className="t-image__demo-wrap">
        <Image src="" style={{ width: 72, height: 72 }} />
        <h5>默认提示</h5>
      </div>
      <div className="t-image__demo-wrap">
        <Image src="" loading={<LoadingIcon size="1.5em" />} style={{ width: 72, height: 72 }} />
        <h5>自定义提示</h5>
      </div>
    </div>
  </>
));

export default LoadingTipDemo;
