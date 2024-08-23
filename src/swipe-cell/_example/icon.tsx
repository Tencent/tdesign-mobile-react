import React from 'react';
import { SwipeCell, Cell, Toast } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Demo() {
  const handleClick = (message = 'click') => {
    Toast({
      message,
    });
  };

  const editIcon = <Icon name="edit" />;
  const delIcon = <Icon name="delete" />;

  const handleEdit = () => handleClick('编辑');
  const handleDelete = () => handleClick('删除');

  const right = [
    { text: '编辑', icon: editIcon, className: 'btn edit-btn', onClick: handleEdit },
    { text: '删除', icon: delIcon, className: 'btn delete-btn', onClick: handleDelete },
  ];

  const vertical = right.map((item) => ({
    ...item,
    className: `${item.className} vertical`,
  }));

  const pureIcon = [
    { icon: editIcon, className: 'btn edit-btn', onClick: handleEdit },
    { icon: delIcon, className: 'btn delete-btn', onClick: handleDelete },
  ];

  return (
    <>
      <TDemoBlock summary="带图标的滑动操作">
        <SwipeCell right={right} content={<Cell title="图标加文字横排" note="辅助信息" />} opened />
      </TDemoBlock>
      <TDemoBlock style={{ marginTop: '10px' }}>
        <SwipeCell right={pureIcon} content={<Cell title="纯图标" note="辅助信息" />} opened />
      </TDemoBlock>
      <TDemoBlock style={{ marginTop: '10px' }}>
        <SwipeCell
          right={vertical}
          content={<Cell title="图标加文字竖排" note="辅助信息" description="一段很长很长的内容文字" />}
          opened
        />
      </TDemoBlock>
    </>
  );
}
