// @ts-ignore
import React from 'react';
import { Upload } from 'tdesign-mobile-react';

import './style/index.less';

export default () => {
  const files = [
    {
      url: 'https://tdesign.gtimg.com/site/upload1.png',
      name: 'uploaded1.png',
      type: 'image',
    },
  ];
  return (
    <div className="demo-section">
      <h3 className="demo-section__title">上传图片</h3>
      <Upload
        accept="image/png"
        files={files}
        action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      />
    </div>
  );
};
