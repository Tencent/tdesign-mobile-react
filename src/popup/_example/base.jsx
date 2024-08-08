import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import PlacementTop from './placement-top';
import PlacementLeft from './placement-left';
import PlacementCenter from './placement-center';
import PlacementBottom from './placement-bottom';
import PlacementRight from './placement-right';
import WithTitle from './with-title';
import CustomClose from './custom-close';

export default function Base() {
  return (
    <div className="tdesign-mobile-popup-demo">
      <TDemoHeader title="Popup 弹窗层" summary="由其他控件触发，屏幕滑出或弹出一块自定义内容区域" />
      <TDemoBlock title="01 组件类型" summary="基础弹出层" padding={true}>
        <PlacementTop />
        <PlacementLeft />
        <PlacementCenter />
        <PlacementBottom />
        <PlacementRight />
      </TDemoBlock>
      <TDemoBlock title="01 组件示例" summary="应用示例" padding={true}>
        <WithTitle />
        <CustomClose />
      </TDemoBlock>
    </div>
  );
}
