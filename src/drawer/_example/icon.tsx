import React, { useState } from 'react';
import { Drawer, Button } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';
import './style/index.less';

export default function IconPage() {
  const [openBase, setOpenBase] = useState(false);

  const onClose = (e) => {
    console.log(e, 'e');
    setOpenBase(false);
  };

  const iconName = 'app';
  const baseSidebar = [
    {
      title: '菜单一',
      icon: <Icon name={iconName} />,
    },
    {
      title: '菜单二',
      icon: <Icon name={iconName} />,
    },
    {
      title: '菜单三',
      icon: <Icon name={iconName} />,
    },
    {
      title: '菜单四',
      icon: <Icon name={iconName} />,
    },
    {
      title: '菜单五',
      icon: <Icon name={iconName} />,
    },
    {
      title: '菜单六',
      icon: <Icon name={iconName} />,
    },
  ];

  return (
    <>
      <Button
        theme="primary"
        size="large"
        variant="outline"
        block
        onClick={() => {
          setOpenBase(!openBase);
        }}
      >
        带图标抽屉
      </Button>
      <Drawer visible={openBase} items={baseSidebar} closeOnOverlayClick onClose={onClose} />
    </>
  );
}
