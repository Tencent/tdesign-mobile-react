import React, { useState } from 'react';
import { Navbar, Button, Image } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

export default function Base() {
  const [navProps, setProps] = useState({});
  return (
    <>
      <TDemoHeader title="Navbar 导航栏" summary="用于不同页面之间切换或者跳转，位于内容区的上方，系统状态栏的下方。" />
      <TDemoBlock title="01 类型" summary="基础导航栏">
        <div className="t-navbar-demo">
          <Button
            variant="outline"
            shape="round"
            block
            onClick={() => {
              setProps({
                leftIcon: false,
              });
            }}
          >
            基础导航栏
          </Button>
          <Button
            variant="outline"
            shape="round"
            block
            onClick={() => {
              setProps({
                leftIcon: true,
              });
            }}
          >
            带返回导航栏
          </Button>
          <Button
            variant="outline"
            shape="round"
            block
            onClick={() => {
              setProps({
                leftIcon: true,
                homeIcon: true,
              });
            }}
          >
            带返回、主页按钮导航栏
          </Button>
          <Button
            variant="outline"
            shape="round"
            block
            onClick={() => {
              setProps({
                title: '',
                leftIcon: <div className='brand'>自定义品牌</div>,
              });
            }}
          >
            自定义品牌导航栏
          </Button>
          <Button
            variant="outline"
            shape="round"
            block
            onClick={() => {
              setProps({
                title: '',
                leftIcon: (
                  <Image
                    src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/mobile/%E5%8D%A0%E4%BD%8D%E5%9B%BE%402x.png"
                    style={{ width: 140, height: 24, marginLeft: 18 }}
                    shape="square"
                  />
                ),
              });
            }}
          >
            自定义图片导航栏
          </Button>
        </div>
      </TDemoBlock>

      <TDemoBlock title="02 特殊类型" summary="品牌超长文字导航栏">
        <div className="t-navbar-demo">
          <Button
            variant="outline"
            shape="round"
            block
            onClick={() => {
              setProps({
                leftIcon: <div className='brand'>品牌名称超长超长超长超长超长超长超长超长超长超长超长超长</div>,
                title: '',
                titleMaxLength: 15,
              });
            }}
          >
            品牌超长文字导航栏
          </Button>
        </div>
      </TDemoBlock>

      <Navbar leftIcon={false} title="标题" {...navProps} />
    </>
  );
}
