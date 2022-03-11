import React, { useState } from 'react';
import { Dialog, Button } from 'tdesign-mobile-react';

const InputUsage = React.memo(() => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="t-dialog__demo-wrap">
      <Button
        theme="primary"
        size="small"
        onClick={() => {
          setVisible(true);
        }}
      >
        带输入框
      </Button>

      <Button
        theme="primary"
        size="small"
        onClick={() => {
          const confirm = Dialog.confirm({
            title: '带输入框对话框',
            cancelBtn: '取消',
            confirmBtn: '确定',
            content: (
              <>
                <p className="t-dialog__demo-tips">
                  请输入相关文案请输入相关文案请输入相关文案请输入相关文案请输入相关文案请输入相关
                </p>
                <input placeholder="输入文案" className="t-dialog__demo-input" />
              </>
            ),
            onConfirm() {
              console.log('click onConfirm');
              confirm.hide();
            },
            onCancel() {
              console.log('click onCancel');
              confirm.hide();
            },
          });
        }}
      >
        带输入框
      </Button>

      <Dialog
        className="test"
        visible={visible}
        title="带输入框对话框"
        confirmBtn="确定"
        cancelBtn="取消"
        content={<input placeholder="输入文案" className="t-dialog__demo-input" />}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={() => {
          setVisible(false);
        }}
      />
    </div>
  );
});

export default InputUsage;
