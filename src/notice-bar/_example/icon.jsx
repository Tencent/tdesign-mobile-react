import React from 'react';
import { NoticeBar } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function IconDemo() {
  return (
    <div className="noticebar-demo">
      <TDemoBlock summary="带图标静态公告栏">
        <NoticeBar visible content="提示文字描述提示文字描述提示文字描述" />
      </TDemoBlock>
    </div>
  );
}
