import React, { useState } from 'react';
import { NoticeBar } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function StaticDemo() {
  const [visible] = useState(true);

  return (
    <div className="noticebar-demo">
      <TDemoBlock title="visible属性">
        <NoticeBar prefixIcon="" visible={visible} content="提示文字描述提示文字描述提示文字描述" />
      </TDemoBlock>
    </div>
  );
}
