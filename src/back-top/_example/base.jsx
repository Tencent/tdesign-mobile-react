import React, { useState, useCallback } from 'react';
import { BackTop, Button, Skeleton } from 'tdesign-mobile-react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style/index.less';

export default function Base() {
  const [theme, setTheme] = useState({
    theme: 'round',
    showText: false,
  });

  const roundTypes = [
    {
      theme: 'round',
      text: '圆白底',
      showText: true,
    },
    {
      theme: 'round-dark',
      text: '圆黑底',
      showText: true,
    },
    {
      theme: 'round',
      text: '圆白底纯图标',
      showText: false,
    },
    {
      theme: 'round-dark',
      text: '圆黑底纯图标',
      showText: false,
    },
  ];

  const halfRoundTypes = [
    {
      theme: 'half-round',
      text: '半圆白底',
    },
    {
      theme: 'half-round-dark',
      text: '半圆黑底',
    },
  ];

  // 切换主题
  const onClick = useCallback((config) => {
    setTheme({
      theme: config.theme,
      showText: config.showText,
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const rowCols = [
    {
      height: '171px',
      borderRadius: '16px',
    },
    1,
    {
      width: '80%',
    },
    [
      {
        width: '60%',
      },
      {
        width: '20%',
      },
    ],
  ];

  return (
    <div className="tdesign-mobile-react-demo">
      <BackTop
        text={theme.showText ? '顶部' : ''}
        // @ts-ignore
        theme={theme.theme}
        // target={() => document.getElementById('anchor')} // 滑动到目标点
      />
      <TDemoHeader title="BackTop 返回顶部" summary="用于当页面过长往下滑动时，帮助用户快速回到页面顶部" />
      <TDemoBlock title="01 类型" summary="圆型返回顶部">
        <div className="button-group">
          {roundTypes.map((v) => (
            <Button className="button" variant="outline" key={v.text} onClick={() => onClick(v)}>
              {v.text}
            </Button>
          ))}
        </div>
      </TDemoBlock>
      <TDemoBlock summary="半圆型返回顶部">
        <div className="button-group">
          {halfRoundTypes.map((v) => (
            <Button className="button" variant="outline" key={v.text} onClick={() => onClick(v)}>
              {v.text}
            </Button>
          ))}
        </div>
      </TDemoBlock>

      <div className="content">
        {Array.from(Array(4), (item, index) => (
          <div className="row" key={index}>
            {Array.from(Array(2), (v, key) => (
              <div className="item" key={key}>
                <Skeleton theme="text" rowCol={rowCols} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
