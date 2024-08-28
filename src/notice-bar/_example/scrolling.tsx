import React from 'react';
import { NoticeBar } from 'tdesign-mobile-react';
import './style/index.less';
import { SoundIcon } from 'tdesign-icons-react';

export default function Scrolling() {
  const content = '提示文字描述提示文字描述提示文字描述提示文字描述文';
  const content1 = ['君不见', '高堂明镜悲白发', '朝如青丝暮成雪', '人生得意须尽欢', '莫使金樽空对月'];

  return (
    <>
      <NoticeBar className="notice-bar-demo-block" visible marquee prefixIcon={null} content={content} />
      <NoticeBar className="notice-bar-demo-block" visible marquee content={content} />
      <NoticeBar visible marquee content={content1} direction="vertical" prefixIcon={<SoundIcon />} />
    </>
  );
}
