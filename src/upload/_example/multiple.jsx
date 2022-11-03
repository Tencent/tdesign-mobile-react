// @ts-ignore
import React, { useState } from 'react';
import { Upload } from 'tdesign-mobile-react';

export default () => {
  const [files, setFiles] = useState([
    {
      url: 'https://tdesign.gtimg.com/site/upload1.png',
      name: 'uploaded1.png',
      type: 'image',
    },
    {
      url: 'https://tdesign.gtimg.com/site/upload2.png',
      name: 'uploaded2.png',
      type: 'image',
    },
    {
      url: 'https://tdesign.gtimg.com/site/upload1.png',
      name: 'uploaded3.png',
      type: 'image',
      status: 'fail',
    },
  ]);
  const handleRemove = ({ index }) => {
    setFiles(files.filter((item, idx) => index !== idx));
  };

  return (
    <div className="demo-section">
      <h3 className="demo-section__title">上传图片</h3>
      <Upload
        accept="image/jpeg"
        files={files}
        action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        multiple
        onRemove={handleRemove}
      />
    </div>
  );
};
