import React from 'react';
import { Toast, Button } from 'tdesign-mobile-react';
import { ErrorCircleIcon } from 'tdesign-icons-react';

export default function () {
  const successColumn = () => {
    Toast({ message: '轻提示文字内容', theme: 'success', direction: 'column' });
  };

  const warningColumn = () => {
    Toast({ message: '轻提示文字内容', icon: <ErrorCircleIcon />, direction: 'column' });
  };

  const errorColumn = () => {
    Toast({ message: '轻提示文字内容', theme: 'error', direction: 'column' });
  };

  return (
    <div className="toast-demo">
      <Button block theme="primary" variant="outline" size="large" onClick={successColumn}>
        成功提示
      </Button>
      <Button block theme="primary" variant="outline" size="large" onClick={warningColumn}>
        警告提示
      </Button>
      <Button block theme="primary" variant="outline" size="large" onClick={errorColumn}>
        错误提示
      </Button>
    </div>
  );
}
