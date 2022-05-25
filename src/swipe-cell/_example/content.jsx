import React from 'react';
import { SwipeCell } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  return (
    <TDemoBlock title="通过直接传入内容或者使用 slot#content 来渲染">
      <SwipeCell
        style={{ height: 48 }}
        right={[{ text: '收藏', theme: 'primary' }]}
        content={<div style={{ padding: 10 }}>使用slot#content</div>}
      />
    </TDemoBlock>
  );
}
