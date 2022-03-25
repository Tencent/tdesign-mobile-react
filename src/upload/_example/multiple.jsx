// @ts-ignore
import { Upload } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default () => {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="多图片上传" summary="不限制数量">
        <Upload action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" multiple />
      </TDemoBlock>
      <TDemoBlock title="" summary="最多上传三张">
        <Upload action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo" multiple max={3} />
      </TDemoBlock>
    </div>
  );
};
