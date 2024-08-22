import React, { useState } from 'react';
import { Icon } from 'tdesign-icons-react';
import { Button, Message } from 'tdesign-mobile-react';
import './style/index.less';

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
    },
    {
      duration: 5000,
      content: '这是一条普通的通知信息，这是一条普通的通知信息，这是一条普通的通知信息',
      marquee: true,
    },
  ];

  const content = ['纯文字的通知', '带图标的通知', '带关闭的通知', '可滚动的通知'];

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
      <Button variant="outline" className="button" onClick={() => setVisible(true)}>
        带按钮的通知
      </Button>
      <Message
        closeBtn={
          <Button
            theme="primary"
            variant="outline"
            className="close-button"
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
      />
    </div>
  );
}
