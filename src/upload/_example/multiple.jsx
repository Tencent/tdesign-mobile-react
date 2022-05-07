// @ts-ignore
import React from 'react';
import { Upload, Cell } from 'tdesign-mobile-react';

export default () => {
  return (
    <>
      <Cell
        title="上传图片"
        description={
          <Upload
            accept="image/jpeg"
            action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
            multiple
          />
        }
      />
    </>
  );
};
