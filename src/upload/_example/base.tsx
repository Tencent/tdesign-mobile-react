// @ts-ignore
import React from 'react';
import { Message, Upload } from 'tdesign-mobile-react';
import './style/index.less';

export default function BaseDemo() {
  const onValidate = (context: any) => {
    if (context.type === 'FILE_OVER_SIZE_LIMIT') {
      Message.warning('文件大小超出限制');
    }
  };
  return (
    <div className="upload-demo">
      <h3 className="upload-title">上传图片</h3>
      <Upload
        accept="image/png"
        action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        max={1}
        multiple={false}
        sizeLimit={{ size: 3000000, unit: 'B' }}
        onValidate={onValidate}
      />
    </div>
  );
}
