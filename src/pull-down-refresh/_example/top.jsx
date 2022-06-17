import React, { useState } from 'react';
import { PullDownRefresh, Skeleton } from 'tdesign-mobile-react';
import './style/index.less';

export default function Demo() {
  const [count, setCount] = useState(0);

  const rowCols = [
    {
      height: '171px',
      borderRadius: '8px',
    },
    [
      {
        width: '50%',
        type: 'circle',
      },
      {
        width: '50%',
        type: 'circle',
      },
    ],
    [
      {
        width: '30%',
        type: 'circle',
      },
      {
        width: '30%',
        type: 'circle',
      },
    ],
  ];
  return (
    <div className="tdesign-mobile-wrapper">
      <PullDownRefresh
        loadingProps={{
          layout: 'vertical',
        }}
        loadingBarHeight={80}
        onRefresh={() =>
          new Promise((resolve) => {
            setCount(count + 1);
            setTimeout(() => {
              resolve();
            }, 1000);
          })
        }
      >
        <div className="tdesign-mobile-block">拖拽该区域演示 中间下拉刷新</div>
        <div style={{ display: 'flex' }}>
          <div className="tdesign-mobile-item">
            <Skeleton theme="text" rowCol={rowCols} />
          </div>
          <div className="tdesign-mobile-item">
            <Skeleton theme="text" rowCol={rowCols} />
          </div>
        </div>
      </PullDownRefresh>
    </div>
  );
}
