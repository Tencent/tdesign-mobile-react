import React from 'react';
import { SwipeCell, Button, Cell, Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  const onActionClick = (event) => {
    console.log(event);
    Toast({ message: 'click' });
  };
  return (
    <TDemoBlock summary="点击事件">
      <SwipeCell
        style={{ height: 48 }}
        left={[{ text: '编辑', theme: 'primary', onClick: onActionClick }]}
        right={
          <Button theme="danger" onClick={onActionClick}>
            删除
          </Button>
        }
        content={<Cell title="点击事件" note="辅助信息" />}
      />
    </TDemoBlock>
  );
}
