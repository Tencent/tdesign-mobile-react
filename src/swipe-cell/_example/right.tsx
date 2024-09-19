import React from 'react';
import { SwipeCell, Cell, Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  const handleClick = (message = 'click') => {
    Toast({
      message,
    });
  };

  const oneButton = (
    <div className="btn favor-btn" onClick={() => handleClick()}>
      选择
    </div>
  );

  return (
    <TDemoBlock summary="右滑单操作">
      <SwipeCell left={oneButton} content={<Cell title="右滑单操作" note="辅助信息" />} opened />
    </TDemoBlock>
  );
}
