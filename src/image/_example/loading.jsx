import React from 'react';
import { Image } from 'tdesign-mobile-react';
import { LoadingIcon } from 'tdesign-icons-react';

const LoadingUsage = React.memo(() => (
  <div className="t-image__demo-status">
    <div className="t-image__demo-wrap">
      <h5>加载默认提示</h5>
      <Image src="" />
    </div>
    <div className="t-image__demo-wrap">
      <h5>加载自定义提示</h5>
      <Image src="" loading={<LoadingIcon size="1.5em" />} />
    </div>
  </div>
));

export default LoadingUsage;
