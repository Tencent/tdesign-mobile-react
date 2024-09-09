import React, { useState } from 'react';
import { PullDownRefresh, Skeleton } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

export default function BaseDemo() {
  const rowCols = [
    1,
    {
      width: '100px',
    },
    {
      width: '165.5px',
      height: '165.5px',
      borderRadius: '12px',
    },
  ];

  const [refreshing, setRefreshing] = useState(false);

  return (
    <PullDownRefresh
      value={refreshing}
      loadingBarHeight={66}
      loadingTexts={['下拉刷新', '松开刷新', '正在刷新', '刷新完成']}
      onScrolltolower={() => {
        console.log('触底');
      }}
      onRefresh={() => {
        console.log('刷新');
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }}
    >
      <div className="tdesign-mobile-demo">
        <TDemoHeader
          title="PullDownRefresh 下拉刷新"
          summary="用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。"
        />
        <TDemoBlock>
          <div className="tdesign-mobile-block">拖拽该区域演示 顶部下拉刷新</div>
          <div className="group">
            {Array.from(Array(6), (_, key) => (
              <Skeleton className="item" key={key} theme="text" rowCol={rowCols} />
            ))}
          </div>
        </TDemoBlock>
      </div>
    </PullDownRefresh>
  );
}
