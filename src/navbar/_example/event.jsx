import React from 'react';
import { Navbar, Message } from 'tdesign-mobile-react';

const EventUsage = () => (
  <Navbar
    onLeftClick={() => {
      Message.success({
        content: '点击返回',
      });
    }}
    onHomeClick={() => {
      Message.success({
        content: '点击主页',
      });
    }}
  >
    标题
  </Navbar>
);

export default EventUsage;
