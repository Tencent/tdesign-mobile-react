import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import Base from './base';
import AvatarText from './avatar-text';
import PicText from './pic-text';
import Flashed from './flashed';
import Gradient from './gradient';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Skeleton 骨架屏"
        summary="用于等待加载内容所展示的占位图形组合，有动态效果加载效果，减少用户等待焦虑。"
      />
      <TDemoBlock title="01 类型" summary="基础">
        <div className="demo-content ">
          <Base />
        </div>
      </TDemoBlock>

      <TDemoBlock summary="头像组合">
        <div className="demo-content ">
          <AvatarText />
        </div>
      </TDemoBlock>

      <TDemoBlock summary="图片组合">
        <div className="demo-content ">
          <PicText />
        </div>
      </TDemoBlock>

      <TDemoBlock title="02 动画效果" summary="渐变加载动画">
        <div className="demo-content ">
          <Gradient />
        </div>
      </TDemoBlock>

      <TDemoBlock summary="闪烁加载动画">
        <div className="demo-content ">
          <Flashed />
        </div>
      </TDemoBlock>
    </div>
  );
}
