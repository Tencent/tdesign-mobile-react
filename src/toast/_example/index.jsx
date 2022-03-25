import React from 'react';
import Text from './text';
import Icon from './icon';
import Base from './base';
import IconText from './iconText';
import Position from './position';
import Mask from './mask';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Toast 轻提示" />
      <Text />
      <Icon />
      <IconText />
      <Base />
      <Position />
      <Mask />
    </div>
  );
}
