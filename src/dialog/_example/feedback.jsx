import React, { useState } from 'react';
import { Dialog, Button } from 'tdesign-mobile-react';

const FeedbackUsage = React.memo(() => {
  const [alertProps, setAlertProps] = useState({ visible: false });

  return (
    <div className="t-dialog__demo-wrap">
      {/* 普通调用 */}
      <Button
        theme="primary"
        size="small"
        onClick={() => {
          setAlertProps({
            visible: true,
            title: '对话框标题',
            confirmBtn: '知道了',
          });
        }}
      >
        对话框(仅标题)
      </Button>
      {/* 命令调用 */}
      <Button
        theme="primary"
        size="small"
        onClick={() => {
          Dialog.alert({
            title: '对话框标题告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
            confirmBtn: '知道了',
          });
        }}
      >
        对话框(仅标题)
      </Button>
      {/* 普通调用 */}
      <Button
        theme="primary"
        size="small"
        onClick={() => {
          setAlertProps({
            visible: true,
            title: '对话框标题',
            content: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
            confirmBtn: '知道了',
          });
        }}
      >
        对话框(标题和内容)
      </Button>

      {/* 命令调用 */}
      <Button
        theme="primary"
        size="small"
        onClick={() => {
          Dialog.alert({
            title: '对话框标题',
            content:
              '告知当前状态、信息和解决方法，等内容。描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很',
            confirmBtn: '知道了',
          });
        }}
      >
        对话框(标题和内容)
      </Button>

      <Dialog
        {...alertProps}
        cancelBtn={null}
        onClose={() => {
          setAlertProps({ visible: false });
        }}
        onConfirm={() => {
          setAlertProps({ visible: false });
        }}
      />
    </div>
  );
});

export default FeedbackUsage;
