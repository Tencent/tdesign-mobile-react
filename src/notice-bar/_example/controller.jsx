import React from 'react';
import { ArrowRightIcon, AppIcon } from 'tdesign-icons-react';
import { NoticeBar, Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function ControllerDemo() {
  const handleClick = (context) => {
    Toast({ message: `click: ${context}` });
  };

  return (
    <div>
      <TDemoBlock summary="带操作公告栏">
        <NoticeBar
          visible
          content="提示文字描述提示文字描述提示文字描述"
          suffixIcon={<ArrowRightIcon />}
          onClick={handleClick}
        />
        <NoticeBar
          visible
          content="提示文字描述提示文字描述"
          extra="详情"
          suffixIcon={<AppIcon />}
          onClick={handleClick}
        />
      </TDemoBlock>
    </div>
  );
}
