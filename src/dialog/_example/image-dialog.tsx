import React, { useState } from 'react';
import { Dialog, Button, DialogProps, Image } from 'tdesign-mobile-react';

const ImageUsage = React.memo(() => {
  const [alertProps, setAlertProps] = useState({ visible: false } as DialogProps);

  return (
    <div className="t-dialog__demo-wrap">
      {/* 普通调用 */}
      <Button
        variant="outline"
        size="large"
        theme="primary"
        block
        onClick={() => {
          setAlertProps({
            visible: true,
            title: '对话框标题',
            closeOnOverlayClick: true,
            content: '告知当前状态、信息和解决方法',
            confirmBtn: '确认',
            cancelBtn: '取消',
            top: <Image src="https://tdesign.gtimg.com/mobile/demos/dialog1.png" fit="contain" />,
          });
        }}
      >
        图片置顶
      </Button>
      <div className="btn-gap"></div>
      <Button
        variant="outline"
        size="large"
        theme="primary"
        block
        onClick={() => {
          setAlertProps({
            visible: true,
            title: '对话框标题',
            closeOnOverlayClick: true,
            content: '告知当前状态、信息和解决方法',
            confirmBtn: '确认',
            cancelBtn: '取消',
            middle: <Image src="https://tdesign.gtimg.com/mobile/demos/dialog1.png" fit="contain" />,
          });
        }}
      >
        图片居中
      </Button>

      <Dialog
        {...alertProps}
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

export default ImageUsage;
