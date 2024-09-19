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
    <div className="btn delete-btn" onClick={() => handleClick()}>
      删除
    </div>
  );
  const twoButtons = (
    <>
      <div className="btn favor-btn" onClick={() => handleClick('收藏成功')}>
        收藏
      </div>
      <div className="btn edit-btn" onClick={() => handleClick('编辑成功')}>
        编辑
      </div>
    </>
  );
  const threeButtons = (
    <>
      {twoButtons}
      <div className="btn delete-btn" onClick={() => handleClick('删除成功')}>
        删除
      </div>
    </>
  );

  const onChange = (e) => {
    console.log('[onChange]', e);
  };

  return (
    <>
      <TDemoBlock summary="左滑单操作">
        <SwipeCell right={oneButton} content={<Cell title="左滑单操作" note="辅助信息" />} opened onChange={onChange} />
      </TDemoBlock>
      <TDemoBlock style={{ marginTop: '10px' }}>
        <SwipeCell
          right={oneButton}
          content={<Cell title="左滑单操作" note="辅助信息" description="一段很长很长的内容文字" />}
          opened
        />
      </TDemoBlock>
      <TDemoBlock style={{ marginTop: '10px' }}>
        <SwipeCell right={twoButtons} content={<Cell title="左滑双操作" note="辅助信息" />} opened />
      </TDemoBlock>
      <TDemoBlock style={{ marginTop: '10px' }}>
        <SwipeCell right={threeButtons} content={<Cell title="左滑三操作" note="辅助信息" />} opened />
      </TDemoBlock>
    </>
  );
}
