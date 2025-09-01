import React, { useState } from 'react';
import { Drawer, Button } from 'tdesign-mobile-react';
import './style/index.less';

const placementList = [
  { key: 1, value: true, text: '显示遮罩层' },
  { key: 2, value: false, text: '不显示遮罩层' },
] as const;

export default function Base() {
  const [openBase, setOpenBase] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const onClose = (e) => {
    console.log(e, 'e');
    setOpenBase(false);
  };

  const baseSidebar = [
    {
      title: '菜单一',
    },
    {
      title: '菜单二',
    },
    {
      title: '菜单三',
    },
    {
      title: '菜单四',
    },
    {
      title: '菜单五',
    },
    {
      title: '菜单六',
    },
  ];

  return (
    <>
      {placementList.map((item) => (
        <Button
          key={item.key}
          theme="primary"
          size="large"
          variant="outline"
          block
          onClick={() => {
            setOpenBase(!openBase);
            setShowOverlay(item.value);
          }}
          style={{ margin: '16px 0' }}
        >
          {item.text}
        </Button>
      ))}
      <Drawer showOverlay={showOverlay} visible={openBase} items={baseSidebar} closeOnOverlayClick onClose={onClose} />
    </>
  );
}
