import React, { useState, useCallback } from 'react';
import { BackTop, Button } from 'tdesign-mobile-react';
import './style/index.less';

export default function HalfRound({ visible, onClose }) {
  const [theme, setTheme] = useState({
    theme: 'half-round',
    text: '返回顶部',
  });

  // 切换主题
  const onClick = useCallback(
    (theme) => {
      setTheme({ theme, text: '返回顶部' });
      onClose();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
    [onClose],
  );

  return (
    <>
      {visible ? <BackTop text={theme.text} theme={theme.theme} /> : null}

      <div className="button-group">
        <Button className="button" variant="outline" onClick={() => onClick('half-round')}>
          半圆白底
        </Button>
        <Button className="button" variant="outline" onClick={() => onClick('half-round-dark')}>
          半圆黑底
        </Button>
      </div>
    </>
  );
}
