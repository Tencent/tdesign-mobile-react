import React, { useState } from 'react';
import { PullDownRefresh } from 'tdesign-mobile-react';

export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <PullDownRefresh
        onRefresh={() =>
          new Promise((resolve) => {
            setCount(count + 1);
            setTimeout(() => {
              resolve();
            }, 1000);
          })
        }
      >
        <div className="pull-down-refresh-content">已下拉{count}次</div>
      </PullDownRefresh>
    </div>
  );
}
