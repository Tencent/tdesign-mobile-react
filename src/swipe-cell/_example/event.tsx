import React, { useRef } from 'react';
import { SwipeCell, Cell, Toast, SwipeCellRef } from 'tdesign-mobile-react';

const DemoBlock = ({ summary, children }: { summary?: string; children?: React.ReactNode }) => (
  <div className="tdesign-mobile-demo-block tdesign-mobile-demo-block_subtitle">
    <div className="tdesign-mobile-demo-block__header">
      <p className="tdesign-mobile-demo-block__summary tdesign-mobile-demo-block_subtitle">{summary}</p>
    </div>
    <div className="tdesign-mobile-demo-block__slot">{children}</div>
  </div>
);

export default function Demo() {
  const ref = useRef<SwipeCellRef>(null);
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
    <DemoBlock summary="带二次确认的操作">
      <SwipeCell
        ref={ref}
        right={actions}
        left={actions}
        content={<Cell title="带二次确认的操作" note="辅助信息" />}
        opened
      />
    </DemoBlock>
  );
}
