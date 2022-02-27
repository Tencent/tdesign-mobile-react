import React, { useState, useCallback } from 'react';
import { BackTop, Button } from 'tdesign-mobile-react';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
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

  const onClick = useCallback((config) => {
    setTheme({
      theme: config.theme,
      showText: config.showText,
    });
  }, []);

  return (
    <div className="tdesign-mobile-react-demo">
      <TDemoHeader
        title="Grid 宫格"
        summary="一行内容/功能的垂直排列方式。一行项目左侧为主要内容展示区域，右侧可增加更多操作内容。"
      />
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
      <div style={{ width: '100%', height: 3700 }} />
      <BackTop
        text={theme.showText ? '顶部' : ''}
        // @ts-ignore
        theme={theme.theme}
      />
    </div>
  );
}
