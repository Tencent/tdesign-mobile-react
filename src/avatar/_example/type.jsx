import React from 'react';
import { UserIcon } from 'tdesign-icons-react';
import { Avatar } from 'tdesign-mobile-react';

const demoImage = 'https://tdesign.gtimg.com/site/avatar.jpg';

export default function AvatarTypeDemo() {
  return (
    <div className="tdesign-demo-block">
      <Avatar image={demoImage} hideOnLoadFailed={false}></Avatar>
      <Avatar icon={<UserIcon />}></Avatar>
      <Avatar>U</Avatar>
    </div>
  );
}
