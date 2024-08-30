import React from 'react';
import { NoticeBar } from 'tdesign-mobile-react';
import './style/index.less';

export default function ThemeDemo() {
  return (
    <>
      <NoticeBar className="notice-bar-demo-block" visible theme="info" content="默认状态公告栏默认状态公告栏" />
      <NoticeBar className="notice-bar-demo-block" visible theme="success" content="成功状态公告栏成功状态公告栏" />
      <NoticeBar className="notice-bar-demo-block" visible theme="warning" content="警示状态公告栏警示状态公告栏" />
      <NoticeBar className="notice-bar-demo-block" visible theme="error" content="错误状态公告栏错误状态公告栏" />
    </>
  );
}
