import React from 'react';
import { Button } from 'tdesign-mobile-react/button';
import { Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const onlyText = () => {
    Toast({ message: '轻提示文字内容' });
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
            <Button className="toast-btn" theme="primary" variant="outline" onClick={onlyText}>
              纯文本
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={textMaxHeight}>
              纯文本最大高度
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
