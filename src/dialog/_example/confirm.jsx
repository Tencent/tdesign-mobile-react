import React, { useState } from 'react';
import { Dialog, Button } from 'tdesign-mobile-react';

const ConfirmUsage = React.memo(() => {
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
            title: '确认框标题',
            confirmBtn: '按钮最多字数',
          });
        }}
      >
        基础确认框
      </Button>
      {/* 命令调用 */}
      <Button
        theme="primary"
        size="small"
        onClick={() => {
          Dialog.confirm({
            title: '确认框标题',
            confirmBtn: {
              content: '警示操作',
              theme: 'danger',
            },
          });
        }}
      >
        警示确认框
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
            confirmBtn: '按钮文案文字内容较长',
            buttonLayout: 'vertical',
          });
        }}
      >
        垂直按钮
      </Button>

      {/* 命令调用 */}
      <Button
        theme="primary"
        size="small"
        onClick={() => {
          const confirm = Dialog.confirm({
            title: '确认框标题',
            content: '告知当前状态、信息和解决方法，等内容。',
            actions: [
              {
                theme: 'primary',
                content: '按钮文案文字内容较长',
                onClick: () => {
                  console.log('click 1');
                  confirm.hide();
                },
              },
              {
                theme: 'primary',
                content: '单行按钮最多十五个字符文案内容',
                onClick: () => {
                  console.log('click 2');
                  confirm.hide();
                },
              },
              {
                theme: 'default',
                content: '取消',
                onClick: () => {
                  confirm.hide();
                },
              },
            ],
          });
        }}
      >
        多个按钮
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
