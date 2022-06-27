import React from 'react';
import { Button } from 'tdesign-mobile-react/button';
import { Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const showTop = () => {
    Toast({ message: '轻提示文字内容', placement: 'top', duration: 1000 });
  };
  const showMiddle = () => {
    Toast({ message: '轻提示文字内容', placement: 'middle' });
  };
  const showBottom = () => {
    Toast({ message: '轻提示文字内容', placement: 'bottom' });
  };
  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="02 展示位置和展示时间" summary="展示位置为顶部、中部、底部三种，展示时间自定义">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={showTop}>
              顶部展示1秒
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={showMiddle}>
              中间展示2秒
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={showBottom}>
              底部展示2秒
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
