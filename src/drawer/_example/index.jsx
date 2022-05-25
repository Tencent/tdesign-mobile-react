import React from 'react';
// import { Drawer, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
// import './style/index.less';

export default function Demo() {
  return (
    <>
      <TDemoHeader
        title="Drawer 抽屉"
        summary="用作一组平行关系页面/内容的切换器，相较于Tab，同屏可展示更多的选项数量。"
      />

      <TDemoBlock title="01 类型" summary="基础抽屉">
        {/* <div className="button-demo">
          <Button size="large" variant="outline" shape="round">
            基础抽屉
          </Button>
        </div> */}
        <Base />
      </TDemoBlock>

      {/* <TDemoBlock summary="带图标抽屉">
        <div className="button-demo">
          <Button size="large" variant="outline" shape="round">
            带图标抽屉
          </Button>
        </div>
      </TDemoBlock> */}
    </>
  );
}
