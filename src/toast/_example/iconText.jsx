import React from 'react';
import { Button } from 'tdesign-mobile-react/button';
import { Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const successHori = () => {
    Toast.success({ message: '成功' });
  };

  const failHori = () => {
    Toast.fail({ message: '失败' });
  };

  const warningHori = () => {
    Toast.warning({ message: '警告' });
  };
  const loadingHori = () => {
    Toast.loading({ message: '加载中', duration: 3000 });
  };

  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="" summary="默认提示-横向">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={successHori}>
              成功-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={failHori}>
              失败-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={warningHori}>
              警告-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={loadingHori}>
              加载-横向
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
