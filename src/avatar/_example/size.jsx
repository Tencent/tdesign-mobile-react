import React from 'react';
import { Avatar } from 'tdesign-mobile-react';
import { UserIcon } from 'tdesign-icons-react';

export default function AvatarSizeDemo() {
  return (
    <>
      <div className="avatar-demo">
        <Avatar shape="circle" size="large" icon={<UserIcon />}></Avatar>
        <Avatar shape="circle" size="medium" icon={<UserIcon />}></Avatar>
        <Avatar shape="circle" size="small" icon={<UserIcon />}></Avatar>
      </div>
      <div className="avatar-demo">
        <Avatar
          shape="circle"
          size="large"
          image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
          alt="示例图片"
          badgeProps={{ count: 10 }}
        ></Avatar>
        <Avatar
          shape="circle"
          size="medium"
          image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
          alt="示例图片"
          badgeProps={{ count: 10 }}
        ></Avatar>
        <Avatar
          shape="circle"
          size="small"
          image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
          alt="示例图片"
          badgeProps={{ dot: true }}
        ></Avatar>
      </div>
      <div className="avatar-demo">
        <Avatar
          shape="round"
          size="large"
          image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
          alt="示例图片"
          badgeProps={{ count: 10 }}
        ></Avatar>
        <Avatar
          shape="round"
          size="medium"
          image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
          alt="示例图片"
          badgeProps={{ count: 10 }}
        ></Avatar>
        <Avatar
          shape="round"
          size="small"
          image="https://tdesign.gtimg.com/mobile/demos/avatar_1.png"
          alt="示例图片"
          badgeProps={{ dot: true }}
        ></Avatar>
      </div>
      <div className="avatar-demo">
        <Avatar shape="circle" size="large" className="custom">
          A
        </Avatar>
        <Avatar shape="circle" size="medium" className="custom">
          A
        </Avatar>
        <Avatar shape="circle" size="small" className="custom">
          A
        </Avatar>
      </div>
    </>
  );
}
