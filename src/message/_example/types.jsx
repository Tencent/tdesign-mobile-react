import React, { useState } from 'react';
import { Icon } from 'tdesign-icons-react';
import { Button, Message } from 'tdesign-mobile-react';

export default function () {
  const [visible, setVisible] = useState(false);
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
      duration: 0,
      content: '这是一条带关闭的消息通知 常驻可关闭',
      icon: true,
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
    },
  ];

  const content = ['纯文字通知', '带图标通知', '带关闭通知'];

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
      <Button variant="outline" className="button" onClick={() => setVisible(true)}>
        带按钮通知
      </Button>
      <Message
        closeBtn={
          <Button
            theme="primary"
            variant="outline"
            onClick={() => {
              setVisible(false);
            }}
          >
            按钮
          </Button>
        }
        visible={visible}
        duration={0}
        content="这是一条带操作的消息通知"
        icon={<Icon name="notification" size={22} />}
        onOpen={() => {
          console.log('control onOpen');
        }}
        onOpened={() => {
          console.log('control onOpened');
        }}
        onClose={() => {
          console.log('control onClose');
        }}
        onClosed={() => {
          console.log('control onClosed');
        }}
        onVisibleChange={(e) => {
          console.log('control onVisibleChange', e);
        }}
      />
    </div>
  );
}
