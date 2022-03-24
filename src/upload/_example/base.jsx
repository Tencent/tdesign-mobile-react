// @ts-ignore
import { Upload } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';

export default () => {
  return (
    <TDemoBlock title="基础上传">
      <Upload action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" />
    </TDemoBlock>
  );
};
