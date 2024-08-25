import React from 'react';
import { Toast, Button } from 'tdesign-mobile-react';

export default function () {
  const showToast = () => {
    Toast({
      message: '轻提示文字内容',
      onClose: () => {
        console.log('onClose');
      },
      onDestroy: () => {
        console.log('onDestroy');
      },
    });
  };

  const hideToast = () => {
    Toast.clear();
  };

  return (
    <ul className="toast-container">
      <li>
        <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={showToast}>
          显示提示
        </Button>
      </li>
      <li>
        <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={hideToast}>
          关闭提示
        </Button>
      </li>
    </ul>
  );
}
