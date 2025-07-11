import React from 'react';
import { Footer } from 'tdesign-mobile-react';

const logo = {
  icon: 'https://tdesign.gtimg.com/mobile/demos/logo2.png',
  title: '品牌名称',
};

export default function LogoDemo() {
  return <Footer logo={logo} />;
}
