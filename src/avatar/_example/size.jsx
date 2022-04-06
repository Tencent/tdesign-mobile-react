import React from 'react';
import { Avatar } from 'tdesign-mobile-react';

export default function AvatarSizeDemo() {
  return (
    <div className="tdesign-demo-avatar">
      <div className="tdesign-demo-block">
        <Avatar size="small">U</Avatar>
        <Avatar size="medium">U</Avatar>
        <Avatar size="large">U</Avatar>
        <Avatar size="88px">U</Avatar>
      </div>
      <div className="tdesign-demo-block">
        <Avatar shape="round" size="small">
          U
        </Avatar>
        <Avatar shape="round" size="medium">
          U
        </Avatar>
        <Avatar shape="round" size="large">
          U
        </Avatar>
        <Avatar shape="round" size="88px">
          U
        </Avatar>
      </div>
    </div>
  );
}
