import React from 'react';
import { Toast, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const successHori = () => {
    Toast.success({ message: '成功' });
  };

  const failHori = () => {
    Toast.fail({ message: '失败' });
  };

  const warningColumn = () => {
    Toast.warning({ message: '警告', direction: 'column' });
  };

  const loadingColumn = () => {
    Toast.loading({ message: '加载中', direction: 'column', duration: 3000 });
  };
  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="" summary="默认提示">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={successHori}>
              成功-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={failHori}>
              失败-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={warningColumn}>
              警告-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={loadingColumn}>
              加载-竖向
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
