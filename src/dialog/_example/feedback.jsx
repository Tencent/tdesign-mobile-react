import React, { useState } from 'react';
import { Dialog, Button } from 'tdesign-mobile-react';

const FeedbackUsage = React.memo(() => {
  const [alertProps, setAlertProps] = useState({ visible: false });

  return (
    <div className="t-dialog__demo-wrap">
      {/* 普通调用 */}
      <Button
        variant="outline"
        shape="round"
        block
        onClick={() => {
          setAlertProps({
            visible: true,
            title: '对话框标题',
            confirmBtn: '知道了',
          });
        }}
      >
        单行标题
      </Button>

      <Button
        variant="outline"
        shape="round"
        block
        onClick={() => {
          setAlertProps({
            visible: true,
            title: '对话框标题告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
            confirmBtn: '知道了',
          });
        }}
      >
        多行标题最大高度
      </Button>

      <Button
        variant="outline"
        shape="round"
        block
        onClick={() => {
          setAlertProps({
            visible: true,
            title: '对话框标题',
            content: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
            confirmBtn: '知道了',
          });
        }}
      >
        带说明文本
      </Button>

      <Button
        variant="outline"
        shape="round"
        block
        onClick={() => {
          setAlertProps({
            visible: true,
            title: '对话框标题',
            content:
              '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内。',
            confirmBtn: '知道了',
          });
        }}
      >
        带说明文本最大高度
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
