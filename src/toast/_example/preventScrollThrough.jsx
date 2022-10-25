import React from 'react';
import { Toast, Button } from 'tdesign-mobile-react';
import { PoweroffIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const showMssk = () => {
    Toast({
      message: '禁止滑动和点击',
      direction: 'column',
      placement: 'bottom',
      duration: 5000,
      preventScrollThrough: true,
      icon: <PoweroffIcon />,
    });
  };
  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="03 展示遮罩" summary="弹窗可显示遮罩，禁止滑动和点击">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={showMssk}>
              禁止滑动和点击
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
