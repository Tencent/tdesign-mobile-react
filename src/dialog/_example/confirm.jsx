import React, { useState } from 'react';
import { Dialog, Button } from 'tdesign-mobile-react';

const ConfirmUsage = React.memo(() => {
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
            content: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
            confirmBtn: '按钮最多字数',
          });
        }}
      >
        双按钮
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
            confirmBtn: {
              theme: 'danger',
              content: '警示操作',
            },
          });
        }}
      >
        警示按钮
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
            confirmBtn: '按钮文字内容较长',
            buttonLayout: 'vertical',
          });
        }}
      >
        双按钮文字过长
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
            confirmBtn: '按钮文案文字内容较长',
            buttonLayout: 'vertical',
            actions: [
              {
                theme: 'primary',
                content: '按钮文案文字内容较长',
                onClick: () => {
                  console.log('click 1');
                  setAlertProps({ visible: false });
                },
              },
              {
                theme: 'primary',
                content: '单行按钮最多十五个字符文案内容',
                onClick: () => {
                  console.log('click 2');
                  setAlertProps({ visible: false });
                },
              },
              {
                theme: 'default',
                content: '取消',
                onClick: () => {
                  setAlertProps({ visible: false });
                },
              },
            ],
          });
        }}
      >
        多按钮
      </Button>

      <Dialog
        {...alertProps}
        cancelBtn="取消"
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

export default ConfirmUsage;
