import React, { useState, useCallback, useRef } from 'react';
import { Loading, Button } from 'tdesign-mobile-react';

export default function () {
  const [progress, setProgress] = useState(0);
  const timer = useRef(null);

  const onPageLoading = useCallback(() => {
    if (timer.current) {
      return;
    }

    let progressValue = 0;
    setProgress(0);

    timer.current = setInterval(() => {
      if (progressValue >= 1) {
        setTimeout(() => {
          setProgress(0);
        }, 2000);

        clearInterval(timer.current);
        timer.current = null;
        return;
      }
      progressValue += 0.01;
      setProgress((pre) => pre + 0.01);
    }, 100);
  }, [timer]);

  return (
    <div className="demo-content">
      <Loading theme="bar" progress={progress} />
      <Button block variant="outline" onClick={onPageLoading}>
        {progress > 0 && progress <= 1 ? '页面加载中...' : '页面进度条加载'}
      </Button>
    </div>
  );
}
