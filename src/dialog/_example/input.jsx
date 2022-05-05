import React, { useState } from 'react';
import { Dialog, Button } from 'tdesign-mobile-react';

const InputUsage = React.memo(() => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="t-dialog__demo-wrap">
      <Button
        variant="outline"
        shape="round"
        block
        onClick={() => {
          setVisible(true);
        }}
      >
        单行标题
      </Button>

      <Button
        variant="outline"
        shape="round"
        block
        onClick={() => {
          const confirm = Dialog.confirm({
            title: '带输入框对话框',
            cancelBtn: '取消',
            confirmBtn: '确定',
            content: (
              <>
                <p className="t-dialog__demo-tips">
                  对话框标题告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内
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
        带说明文本
      </Button>

      <Dialog
        visible={visible}
        title="带输入框对话框"
        confirmBtn="确定"
        cancelBtn="取消"
        content={<input placeholder="输入文案" className="t-dialog__demo-input" />}
        destroyOnClose
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
