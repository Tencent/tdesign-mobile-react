import React from 'react';
import { Avatar } from 'tdesign-mobile-react';
import { UserIcon, UserAddIcon } from 'tdesign-icons-react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

import './style/index.less';

const demoPicture = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';

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

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Toast 轻提示" summary="用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。" />
      <TDemoBlock title="01 头像类型" summary="头像样式可为默认头像、微信头像圆形、方形、自定义文字">
        <div className="avatar-demo">
          <Avatar icon={<UserIcon />} />

          <Avatar alt="示例图片" hideOnLoadFailed={false} image={demoPicture}></Avatar>

          <Avatar icon={<img src={demoPicture} alt="示例图片" />} />
          <Avatar image={demoPicture} shape="round" />
          <Avatar className="custom">A</Avatar>
        </div>
      </TDemoBlock>
      <TDemoBlock title="02 特殊类型" summary="纯展示 从上往下">
        <div className="avatar-group-demo">
          <Avatar.Group cascading="right-up" max={5} size="small">
            {imageList.map((url, idx) => (
              <Avatar key={idx} shape="circle" image={url} />
            ))}
          </Avatar.Group>
        </div>
        <div className="avatar-group-demo">
          <Avatar.Group cascading="right-up" max={5} size="40px">
            {imageList.map((url, idx) => (
              <Avatar key={idx} shape="circle" image={url} />
            ))}
          </Avatar.Group>
        </div>
        <div className="avatar-group-demo">
          <Avatar.Group cascading="right-up" max={5}>
            {imageList.map((url, idx) => (
              <Avatar key={idx} shape="circle" image={url} />
            ))}
          </Avatar.Group>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="带操作 从下往上">
        <div className="avatar-group-demo">
          <Avatar.Group cascading="left-up" max={5} size="small" collapseAvatar={<UserAddIcon />}>
            {imageList.map((url, idx) => (
              <Avatar key={idx} shape="circle" image={url} />
            ))}
          </Avatar.Group>
        </div>
        <div className="avatar-group-demo">
          <Avatar.Group
            cascading="left-up"
            max={5}
            size="40px"
            collapseAvatar={<UserAddIcon style={{ fontSize: '20px' }} />}
          >
            {imageList.map((url, idx) => (
              <Avatar key={idx} shape="circle" image={url} />
            ))}
          </Avatar.Group>
        </div>
        <div className="avatar-group-demo">
          <Avatar.Group cascading="left-up" max={5} collapseAvatar={<UserAddIcon style={{ fontSize: '24x' }} />}>
            {imageList.map((url, idx) => (
              <Avatar key={idx} shape="circle" image={url} />
            ))}
          </Avatar.Group>
        </div>
      </TDemoBlock>
      <TDemoBlock title="03 规格" summary="头像大小尺寸">
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
      </TDemoBlock>
    </div>
  );
}
