import React from 'react';
import { Button } from 'tdesign-mobile-react/button';
import { LocationIcon } from 'tdesign-icons-react';
import { Toast } from 'tdesign-mobile-react';

export default function () {
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
      <ul className="toast-container">
        <li>
          <Button className="toast-btn" theme="primary" variant="outline" onClick={iconColumn}>
            带图标-竖向
          </Button>
        </li>
        <li>
          <Button className="toast-btn" theme="primary" variant="outline" onClick={textMaxHeight}>
            纯文本最大高度
          </Button>
        </li>
      </ul>
    </div>
  );
}
