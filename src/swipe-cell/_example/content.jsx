import React from 'react';
import { SwipeCell, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  return (
    <TDemoBlock title="通过直接传入内容或者使用 slot#content 来渲染">
      <SwipeCell
        style={{ height: 48 }}
        right={[
          { text: '删除', theme: 'danger' },
          { text: '确认', theme: 'primary' },
        ]}
        left={<Button>编辑</Button>}
        content={<div className="content-text">使用slot#content</div>}
        threshold="33%"
      />
    </TDemoBlock>
  );
}
