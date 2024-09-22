import React, { useRef } from 'react';
import { SwipeCell, Cell, Toast, SwipeCellInstanceFunctions } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  const ref = useRef<SwipeCellInstanceFunctions>();
  const handleClick = (message = 'click') => {
    Toast({
      message,
    });
  };
  const handleSureConfirm = () => {
    Toast.success({
      message: '删除成功',
    });
    ref.current.close();
  };

  const handleEdit = () => handleClick('编辑');
  const handleDelete = () => handleClick('删除');

  const sure = (
    <div className="sure-delete" onClick={handleSureConfirm}>
      确认删除？
    </div>
  );

  const actions = [
    { text: '编辑', className: 'btn edit-btn', onClick: handleEdit },
    { text: '删除', className: 'btn delete-btn', onClick: handleDelete, sure },
  ];

  return (
    <TDemoBlock summary="带二次确认的操作">
      <SwipeCell
        ref={ref}
        right={actions}
        left={actions}
        content={<Cell title="带二次确认的操作" note="辅助信息" />}
        opened
      />
    </TDemoBlock>
  );
}
