import React from 'react';
import { UserIcon } from 'tdesign-icons-react';
import { Avatar } from 'tdesign-mobile-react';

const demoPicture = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';

export default function AvatarTypeDemo() {
  return (
    <>
      <Avatar icon={<UserIcon />} />

      <Avatar alt="示例图片" hideOnLoadFailed={false} image={demoPicture}></Avatar>

      <Avatar icon={<img src={demoPicture} alt="示例图片" />} />
      <Avatar image={demoPicture} shape="round" />
      <Avatar className="custom">A</Avatar>
    </>
  );
}
