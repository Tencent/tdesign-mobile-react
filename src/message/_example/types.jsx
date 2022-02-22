import React from 'react';
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
        <Button theme="primary" variant="outline" size="small">
          按钮
        </Button>
      ),
      duration: 5000,
      visible: true,
      zIndex: 5000,
      onClose: (e) => {
        console.log(e);
      },
      onClosed: (e) => {
        console.log(e);
      },
      onOpen: (e) => {
        console.log(e);
      },
      onOpened: (e) => {
        console.log(e);
      },
      onVisibleChange: (e) => {
        console.log(e);
      },
      content: '这是一条带操作的消息通知',
      icon: true,
    },
    {
      duration: 3000,
      content: '这是一条普通消息通知',
      icon: true,
    },
    {
      theme: 'warning',
      content: '这是一条需要用户关注到的警示通知',
      icon: true,
    },
    {
      theme: 'success',
      content: '这是一条需要成功的提示消息',
      icon: true,
    },
    {
      theme: 'error',
      content: '这是一条错误提示通知',
      icon: true,
    },
  ];

  const content = ['纯文字通知', '带图标通知', '带关闭通知', '带按钮通知'];

  const onClick = (index) => {
    // @ts-ignore
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
