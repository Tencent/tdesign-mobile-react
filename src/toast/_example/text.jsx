import React from 'react';
import { LocationIcon } from 'tdesign-icons-react';
import { Toast, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const onlyText = () => {
    Toast({ message: '轻提示文字内容' });
  };
  const iconHori = () => {
    Toast({ message: '地点', icon: <LocationIcon /> });
  };

  const iconColumn = () => {
    Toast({ icon: <LocationIcon />, direction: 'column' });
  };

  const textMaxHeight = () => {
    Toast({
      message: '这是一段很长的文字超级长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
    });
  };

  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="01 类型" summary="基础提示">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={onlyText}>
              纯文本
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={iconHori}>
              带图标-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={iconColumn}>
              带图标-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" size="large" onClick={textMaxHeight}>
              纯文本最大高度
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
