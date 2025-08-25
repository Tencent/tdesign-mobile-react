import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import ImageAvatar from './image-avatar';
import CharacterAvatar from './character-avatar';
import IconAvatar from './icon-avatar';
import BadgeAvatar from './badge-avatar';
import ExhibitionAvatar from './exhibition';
import ActionAvatar from './action';
import SizeAvatar from './size';
import './style/index.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Avatar 头像" summary="用于告知用户，该区域的状态变化或者待处理任务的数量。" />
      <TDemoBlock title="01 头像类型" summary="图片头像">
        <ImageAvatar />
      </TDemoBlock>
      <TDemoBlock summary="字符头像">
        <CharacterAvatar />
      </TDemoBlock>
      <TDemoBlock summary="图标头像">
        <IconAvatar />
      </TDemoBlock>
      <TDemoBlock title="02 组件样式" summary="纯展示">
        <ExhibitionAvatar />
      </TDemoBlock>
      <TDemoBlock summary="带操作">
        <ActionAvatar />
      </TDemoBlock>
      <TDemoBlock summary="徽标头像">
        <BadgeAvatar />
      </TDemoBlock>
      <TDemoBlock title="03 组件尺寸" summary="large/medium/small 尺寸">
        <SizeAvatar />
      </TDemoBlock>
    </div>
  );
}
