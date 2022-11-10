import React, { useState, useCallback } from 'react';
import { BackTop, Button } from 'tdesign-mobile-react';
import './style/index.less';

export default function Round({ visible, onClose }) {
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
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
    [onClose],
  );

  return (
    <>
      {visible ? <BackTop text={theme.text} theme={theme.theme} /> : null}
      <div className="button-group">
        <Button className="button" variant="outline" onClick={() => onClick('round', '顶部')}>
          圆角白底
        </Button>
        <Button className="button" variant="outline" onClick={() => onClick('round-dark', '顶部')}>
          圆角黑底
        </Button>
        <Button className="button" variant="outline" onClick={() => onClick('round', '')}>
          圆白底纯图标
        </Button>
        <Button className="button" variant="outline" onClick={() => onClick('round-dark', '')}>
          圆黑底纯图标
        </Button>
      </div>
    </>
  );
}
