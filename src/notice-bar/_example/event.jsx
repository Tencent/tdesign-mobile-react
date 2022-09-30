import React, { useState } from 'react';
import { CloseIcon } from 'tdesign-icons-react';
import { NoticeBar, Toast, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function EventDemo() {
  const [visible, setVisible] = useState(false);
  const handleClick = (context) => {
    Toast({ message: `click: ${context}` });
  };

  const handleChange = () => {
    setVisible((prev) => !prev);
  };

  const handleConsole = (value) => {
    console.log(value);
  };

  return (
    <div className="noticebar-demo">
      <TDemoBlock title="事件">
        <Button onClick={handleChange}>显示/隐藏</Button>
        <NoticeBar
          visible={visible}
          content="提示文字描述提示文字描述提示文字描述"
          onClick={handleClick}
          onChange={handleConsole}
          suffixIcon={<CloseIcon />}
        />
      </TDemoBlock>
    </div>
  );
}
