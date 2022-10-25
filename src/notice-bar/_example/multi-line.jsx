import React from 'react';
import { ArrowRightIcon, CloseIcon } from 'tdesign-icons-react';
import { NoticeBar, Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function MultiLineDemo() {
  const closeIcon = <CloseIcon />;
  const arrowRightIcon = <ArrowRightIcon />;

  const handleClick = (context) => {
    Toast({ message: `click:${context}` });
  };

  return (
    <div className="noticebar-demo">
      <TDemoBlock title="03 多行文字公告栏">
        <NoticeBar
          visible
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          prefixIcon=""
        />
        <NoticeBar
          visible
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          onClick={handleClick}
        />
        <NoticeBar
          visible
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          suffixIcon={arrowRightIcon}
          onClick={handleClick}
        />
        <NoticeBar
          visible
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          suffixIcon={closeIcon}
          onClick={handleClick}
          extra="详情"
        />
      </TDemoBlock>
    </div>
  );
}
