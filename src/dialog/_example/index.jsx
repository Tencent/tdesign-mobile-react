import React from 'react';
import { Dialog, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import FeedbackUsage from './feedback';
import ConfirmUsage from './confirm';
import InputUsage from './input';
import './style/index.less';

export default function Base() {
  return (
    <>
      <TDemoHeader
        title="Dialog 对话框"
        summary="用于显示重要提示或请求用户进行重要操作，一种打断当前操作的模态视图。"
      />
      <TDemoBlock title="01 类型" summary="反馈类对话框">
        <FeedbackUsage />
      </TDemoBlock>
      <TDemoBlock summary="确认类对话框">
        <ConfirmUsage />
      </TDemoBlock>
      <TDemoBlock summary="输入类对话框">
        <InputUsage />
      </TDemoBlock>
      <TDemoBlock summary="命令调用">
        <div className="t-dialog__demo-wrap">
          <Button
            variant="outline"
            block
            size="large"
            onClick={() => {
              Dialog.confirm({
                visible: true,
                title: '对话框标题',
                content: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
                confirmBtn: '确认按钮',
                cancelBtn: '取消按钮',
              });
            }}
          >
            带取消按钮
          </Button>
          <Button
            variant="outline"
            block
            size="large"
            onClick={() => {
              Dialog.alert({
                visible: true,
                title: '对话框标题',
                content: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
                confirmBtn: '确认按钮',
              });
            }}
          >
            无取消按钮
          </Button>
        </div>
      </TDemoBlock>
    </>
  );
}
