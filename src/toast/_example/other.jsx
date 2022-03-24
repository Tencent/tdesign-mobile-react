import React from 'react';
import { Button } from 'tdesign-mobile-react/button';
import { Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const showTop = () => {
    Toast({ message: '轻提示文字内容', placement: 'top' });
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
            <Button className="toast-btn" theme="primary" variant="outline" onClick={showTop}>
              顶部Top
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={showMiddle}>
              中间Middle
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={showBottom}>
              底部Bottom
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
