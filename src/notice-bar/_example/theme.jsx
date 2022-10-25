import React from 'react';
import { NoticeBar } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function ThemeDemo() {
  return (
    <div className="noticebar-demo">
      <TDemoBlock title="状态">
        <NoticeBar visible theme="info" content="默认状态公告栏默认状态公告栏" />
        <NoticeBar visible theme="success" content="成功状态公告栏成功状态公告栏" />
        <NoticeBar visible theme="warning" content="警示状态公告栏警示状态公告栏" />
        <NoticeBar visible theme="error" content="错误状态公告栏错误状态公告栏" />
      </TDemoBlock>
    </div>
  );
}
