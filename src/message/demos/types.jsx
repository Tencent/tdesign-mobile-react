import React from 'react';
import { Icon } from 'tdesign-icons-react';
import { Message } from 'tdesign-mobile-react';

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
      onClose: (e) => {
        console.log(e);
      },
      onClosed: (e) => {
        console.log(e);
      },
      duration: 0,
      content: '这是一条带关闭的消息通知 常驻可关闭',
      icon: true,
    },
    {
      visible: true,
      zIndex: 5000,
      content: '这是一条滚动的通知信息',
      icon: true,
    },
    {
      closeBtn: <Icon name="call" size={24} />,
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

  const content = ['纯文字通知', '带图标通知', '带关闭通知', '滚动通知', '带按钮通知'];

  const onClick = (index) => {
    Message.info({
      ...messages[index],
    });
  };

  return (
    <>
      {content.map((v, index) => (
        <div className="btn" onClick={() => onClick(index)} key={index}>
          {v}
        </div>
      ))}
    </>
  );
}
