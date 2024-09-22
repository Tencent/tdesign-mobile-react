import React from 'react';
import { SwipeCell, Cell, Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  const handleClick = (message = 'click') => {
    Toast({
      message,
    });
  };

  const leftButton = (
    <div className="btn favor-btn" onClick={() => handleClick()}>
      删除
    </div>
  );
  const rightButtons = (
    <>
      <div className="btn favor-btn" onClick={() => handleClick('收藏')}>
        收藏
      </div>
      <div className="btn delete-btn" onClick={() => handleClick('删除')}>
        删除
      </div>
    </>
  );

  return (
    <TDemoBlock summary="左右滑操作">
      <SwipeCell left={leftButton} right={rightButtons} content={<Cell title="左右滑操作" note="辅助信息" />} opened />
    </TDemoBlock>
  );
}
