import React, { useState } from 'react';
import { CloseIcon, ChevronRightIcon } from 'tdesign-icons-react';
import { NoticeBar, Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

function MobileDemo() {
  const [visible] = useState(true);
  const iconFunc = <CloseIcon />;
  const arrowRight = <ChevronRightIcon />;
  const handleClick = (context) => {
    Toast({ message: `click:${context}` });
  };

  return (
    <div className="noticebar-demo">
      <TDemoBlock title="01 类型" summary="静态消息公告栏">
        <NoticeBar visible content="提示文字描述提示文字描述提示文字描述" prefixIcon="" />
      </TDemoBlock>
      <TDemoBlock summary="带图标静态公告栏">
        <NoticeBar visible content="提示文字描述提示文字描述提示文字描述" />
      </TDemoBlock>
      <TDemoBlock summary="滚动公告栏">
        <NoticeBar
          marquee={{ loop: 1 }}
          prefixIcon=""
          content="提示文字描述提示文字描述提示文字描述提示文字描提示文字"
          visible={visible}
        />
        <NoticeBar marquee={{ loop: 1 }} content="提示文字描述提示文字描述提示文字描述提示文字描提示文字" visible />
      </TDemoBlock>
      <TDemoBlock summary="带操作公告栏">
        <NoticeBar
          onClick={handleClick}
          suffixIcon={arrowRight}
          content="提示文字描述提示文字描述提示文字描述"
          visible
        />
        <NoticeBar
          extra="详情"
          onClick={handleClick}
          suffixIcon={iconFunc}
          content="提示文字描述提示文字描述"
          visible
        />
      </TDemoBlock>
      <TDemoBlock title="02 状态">
        <NoticeBar visible theme="info" content="默认状态公告栏默认状态公告栏" />
        <NoticeBar visible theme="success" content="成功状态公告栏成功状态公告栏" />

        <NoticeBar visible theme="warning" content="警示状态公告栏警示状态公告栏" />
        <NoticeBar visible theme="error" content="错误状态公告栏错误状态公告栏" />
      </TDemoBlock>
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
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述文字描述文字描述"
          suffixIcon={arrowRight}
          onClick={handleClick}
        />
        <NoticeBar
          visible
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          extra="详情"
          suffixIcon={iconFunc}
          onClick={handleClick}
        />
      </TDemoBlock>{' '}
    </div>
  );
}

export default MobileDemo;
