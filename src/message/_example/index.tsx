import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
import Theme from './theme';
import CloseAll from './close-all';
import './style/index.less';

export default function Demo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Message 消息通知" summary="用于轻量级反馈或提示，不会打断用户操作。 " />
      <TDemoBlock title="01 类型" summary="弹窗内容为纯文本、标题和副标题、带输入框">
        <Base />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="弹窗状态为普通弹窗、警示提示弹窗、成功提示弹窗、错误提示弹窗。">
        <Theme />
      </TDemoBlock>
      <TDemoBlock title="03 关闭所有通知" summary="关闭所有通知">
        <CloseAll />
      </TDemoBlock>
    </div>
  );
}
