import React from 'react';
import { SwipeCell, Cell, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  const cellLeftIcon = (
    <img
      src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png"
      style={{ width: 50, height: 50, marginRight: 8, float: 'left' }}
    />
  );
  return (
    <TDemoBlock summary="左滑大列表">
      <SwipeCell
        right={<Button theme="danger">删除</Button>}
        content={
          <Cell
            title="左滑大列表"
            description="一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字"
            leftIcon={cellLeftIcon}
          />
        }
      />
      <SwipeCell
        expanded="right"
        right={<Button theme="danger">删除</Button>}
        content={
          <Cell
            title="左滑大列表"
            expanded="right"
            description="一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字"
            leftIcon={cellLeftIcon}
          />
        }
      />
    </TDemoBlock>
  );
}
