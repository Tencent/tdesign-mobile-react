import React, { useState } from 'react';
import { NoticeBar } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function ScrollingDemo() {
  const [visible] = useState(true);

  return (
    <div className="noticebar-demo">
      <TDemoBlock summary="滚动公告栏">
        <NoticeBar
          marquee
          prefixIcon=""
          visible={visible}
          content="提示文字描述提示文字描述提示文字描述提示文字描述文提示文字描述提示文字"
        />
        <NoticeBar visible marquee content="提示文字描述提示文字描述提示文字描述提示文字描述文提示文字描述提示文字" />
      </TDemoBlock>
    </div>
  );
}
