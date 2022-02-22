import React from 'react';
import { Icon } from 'tdesign-icons-react';
import { Message, Button } from 'tdesign-mobile-react';

export default function () {
  const messages = [
    {
      duration: 5000,
      content: '这是一条纯文字的消息通知 5s消失',
    },
    {
      duration: 5000,
      content: '这是一条带图标的消息通知 5s消失',
      icon: true,
    },
    {
      closeBtn: true,
      visible: true,
      duration: 0,
      content: '这是一条带关闭的消息通知 常驻可关闭',
      icon: true,
    },
    {
      closeBtn: (
        <Button theme="primary" variant="outline" style={{ height: 26 }}>
          按钮
        </Button>
      ),
      duration: 0,
      visible: true,
      zIndex: 5000,
      onOpen: () => {
        console.log('onOpen');
      },
      onOpened: () => {
        console.log('onOpened');
      },
      onClose: () => {
        console.log('onClose');
      },
      onClosed: () => {
        console.log('onClosed');
      },
      onVisibleChange: (e) => {
        console.log('onVisibleChange', e);
      },
      content: '这是一条带操作的消息通知',
      icon: <Icon name="notification" size={22} />,
    },
  ];

  const content = ['纯文字通知', '带图标通知', '带关闭通知', '带按钮通知'];

  const onClick = (index) => {
    Message.info({
      ...messages[index],
    });
  };

  return (
    <div className="container">
      {content.map((v, index) => (
        <Button variant="outline" className="button" onClick={() => onClick(index)} key={index}>
          {v}
        </Button>
      ))}
    </div>
  );
}
