import React from 'react';
import { Avatar } from 'tdesign-mobile-react';

const imageList = [
  'https://tdesign.gtimg.com/mobile/demos/avatar_1.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_2.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_3.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_4.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_5.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_1.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_2.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_3.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_4.png',
  'https://tdesign.gtimg.com/mobile/demos/avatar_5.png',
];

export default function AvatarTypeDemo() {
  return (
    <>
      <div className="avatar-group-demo">
        <Avatar.Group cascading="right-up" max={5} size="small">
          {imageList.map((url, idx) => (
            <Avatar key={idx} shape="circle" image={url} />
          ))}
        </Avatar.Group>
      </div>
      <div className="avatar-group-demo">
        <Avatar.Group cascading="right-up" max={5} size="medium">
          {imageList.map((url, idx) => (
            <Avatar key={idx} shape="circle" image={url} />
          ))}
        </Avatar.Group>
      </div>
      <div className="avatar-group-demo">
        <Avatar.Group cascading="right-up" max={5} size="large">
          {imageList.map((url, idx) => (
            <Avatar key={idx} shape="circle" image={url} />
          ))}
        </Avatar.Group>
      </div>
    </>
  );
}
