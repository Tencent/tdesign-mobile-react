import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import ShapeDemo from './shape';
import ExhibitionDemo from './exhibition';
import ActionDemo from './action';
import SizeDemo from './size';
import './style/index.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Avatar 头像" summary="用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。" />
      <TDemoBlock title="01 头像类型" summary="头像样式可为默认头像、微信头像圆形、方形、自定义文字">
        <div className="avatar-demo">
          <ShapeDemo />
        </div>
      </TDemoBlock>
      <TDemoBlock title="02 特殊类型" summary="纯展示 从上往下">
        <ExhibitionDemo />
      </TDemoBlock>
      <TDemoBlock summary="带操作 从下往上">
        <ActionDemo />
      </TDemoBlock>
      <TDemoBlock title="03 规格" summary="头像大小尺寸">
        <SizeDemo />
      </TDemoBlock>
    </div>
  );
}
