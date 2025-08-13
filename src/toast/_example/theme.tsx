import React from 'react';
import { Toast, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const successColumn = () => {
    Toast({ message: '轻提示文字内容', theme: 'success', direction: 'column' });
  };

  const warningColumn = () => {
    Toast({ message: '轻提示文字内容', theme: 'warning', direction: 'column' });
  };

  const errorColumn = () => {
    Toast({ message: '轻提示文字内容', theme: 'error', direction: 'column' });
  };

  return (
    <div className="toast-demo">
      <TDemoBlock summary="成功提示" padding>
        <Button block theme="primary" variant="outline" size="large" onClick={successColumn}>
          成功提示
        </Button>
      </TDemoBlock>

      <TDemoBlock summary="警告提示" padding>
        <Button block theme="primary" variant="outline" size="large" onClick={warningColumn}>
          警告提示
        </Button>
      </TDemoBlock>

      <TDemoBlock summary="失败提示" padding>
        <Button block theme="primary" variant="outline" size="large" onClick={errorColumn}>
          失败提示
        </Button>
      </TDemoBlock>
    </div>
  );
}
