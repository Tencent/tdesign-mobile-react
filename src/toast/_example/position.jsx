import React from 'react';
import { Toast, Button } from 'tdesign-mobile-react';
import { StarIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const showPositionAndDuration = (placement, duration, message) => {
    Toast({
      placement,
      message,
      duration,
      icon: <StarIcon />,
      direction: 'column',
    });
  };
  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="02 展示位置和展示时间" summary="展示位置为顶部、中部、底部三种，展示时间自定义">
        <ul className="toast-container">
          <li>
            <Button
              className="toast-btn"
              theme="primary"
              variant="outline"
              size="large"
              onClick={() => showPositionAndDuration('top', 1000, '顶部-展示1秒')}
            >
              顶部展示1秒
            </Button>
          </li>
          <li>
            <Button
              className="toast-btn"
              theme="primary"
              variant="outline"
              size="large"
              onClick={() => showPositionAndDuration('middle', 2000, '中间-展示2秒')}
            >
              中间展示2秒
            </Button>
          </li>
          <li>
            <Button
              className="toast-btn"
              theme="primary"
              variant="outline"
              size="large"
              onClick={() => showPositionAndDuration('bottom', 3000, '底部-展示3秒')}
            >
              底部展示3秒
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
