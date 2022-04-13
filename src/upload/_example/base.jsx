import React from 'react';
import { Upload } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default () => (
  <TDemoBlock title="基础上传">
    <Upload action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" />
  </TDemoBlock>
);
