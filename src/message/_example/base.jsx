import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Types from './types';
import Status from './status';
import './style/index.less';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Message 消息通知" summary="用于轻量级反馈或提示，不会打断用户操作。 " />
      <TDemoBlock title="01 类型" summary="弹窗内容为纯文本、标题和副标题、带输入框">
        <Types />
      </TDemoBlock>
      <TDemoBlock title="02 状态" summary="弹窗状态为普通弹窗、警示提示弹窗、成功提示弹窗、错误提示弹窗。">
        <Status />
      </TDemoBlock>
    </div>
  );
}
