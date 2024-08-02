import React, { useState, useCallback } from 'react';
import { BackTop, Button } from 'tdesign-mobile-react';
import './style/index.less';

export default function Base({ visible, onClose, container }) {
  const [theme, setTheme] = useState({
    theme: 'round',
    text: '顶部',
  });

  // 切换主题
  const onClick = useCallback(
    (theme, text) => {
      setTheme({
        theme,
        text,
      });
      onClose();
      const containerElement = container();
      containerElement.scrollTop = 1200;
    },
    [onClose, container],
  );

  function handleToTop() {
    console.log('handleToTop');
  }

  return (
    <>
      {visible ? <BackTop text={theme.text} theme={theme.theme} onToTop={handleToTop} container={container} /> : null}
      <div className="button-group">
        <Button className="button" variant="outline" theme="primary" onClick={() => onClick('round', '顶部')}>
          圆形返回顶部
        </Button>
        <Button className="button" variant="outline" theme="primary" onClick={() => onClick('half-round', '返回顶部')}>
          半圆形返回顶部
        </Button>
      </div>
    </>
  );
}
