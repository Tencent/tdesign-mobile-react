import React from 'react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import FeedbackUsage from './feedback';
import ConfirmUsage from './confirm';
import InputUsage from './input';
import './style/index.less';

export default function Base() {
  return (
    <>
      <TDemoHeader title="Dialog 对话框" summary="一种打断当前操作的模态视图，用于显示重要提示或请求用户进行重要操作" />
      <TDemoBlock title="反馈类对话框" summary="用于用户进行了一个操作，需传达重要信息，告知用户当前状况的情况。">
        <FeedbackUsage />
      </TDemoBlock>
      <TDemoBlock
        title="确认类对话框"
        summary="用于用户进行了一个操作，后果比较严重，需要用户二次确认的情况。 例如 退出、删除、清空等操作"
      >
        <ConfirmUsage />
      </TDemoBlock>
      <TDemoBlock title="输入对话框" summary="用于用户进行了一个操作，需输入下一步操作的必要信息。 例如 输入密码">
        <InputUsage />
      </TDemoBlock>
    </>
  );
}
