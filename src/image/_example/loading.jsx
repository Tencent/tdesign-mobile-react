import React from 'react';
import { Image } from 'tdesign-mobile-react';
import { LoadingIcon } from 'tdesign-icons-react';

const LoadingUsage = React.memo(() => (
  <div className="t-image__demo-status">
    <Image style={{ width: 72, height: 72 }} src="https://tdesign.gtimg.com/site/upload1.png" />

    <Image
      style={{ width: 72, height: 72 }}
      src="https://tdesign.gtimg.com/site/upload1.png"
      loading={<LoadingIcon size="1.5em" />}
    />
  </div>
));

export default LoadingUsage;
