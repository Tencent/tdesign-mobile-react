import React from 'react';
import Text from './text';
import Icon from './icon';
import Base from './base';
import IconText from './iconText';
import Position from './position';
import Mask from './mask';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo container">
      <TDemoHeader title="Toast 轻提示" summary="用于轻量级反馈或提示，不会打断用户操作" />
      <Text />
      <Icon />
      <IconText />
      <Base />
      <Position />
      <Mask />
    </div>
  );
}
