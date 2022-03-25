import React from 'react';
import { Button } from 'tdesign-mobile-react/button';
import { Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const successColumn = () => {
    Toast.success({ message: '成功', direction: 'column' });
  };

  const failColumn = () => {
    Toast.fail({ message: '失败', direction: 'column' });
  };

  const warningColumn = () => {
    Toast.warning({ message: '警告', direction: 'column' });
  };

  const loadingColumn = () => {
    Toast.loading({ message: '加载中', direction: 'column' });
  };

  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="" summary="默认提示">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={successColumn}>
              成功-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={failColumn}>
              失败-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={warningColumn}>
              警告-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={loadingColumn}>
              加载-竖向
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
