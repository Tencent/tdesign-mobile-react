import React from 'react';
import { Skeleton } from 'tdesign-mobile-react';
import BaseDemo from './base';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

export default function Demo() {
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
  return (
    <div className="tdesign-mobile-demo">
      <BaseDemo>
        <>
          <TDemoHeader
            title="PullDownRefresh 下拉刷新"
            summary="用于快速刷新页面信息，刷新可以是整页刷新也可以是页面的局部刷新。"
          />
          <TDemoBlock>
            <div className="tdesign-mobile-block">拖拽该区域演示 顶部下拉刷新</div>
            <div style={{ display: 'flex', padding: '0 16px 140px 16px' }}>
              {Array.from(Array(2), (item, key) => (
                <div className="tdesign-mobile-item" key={key}>
                  <Skeleton theme="text" rowCol={rowCols} />
                </div>
              ))}
            </div>
          </TDemoBlock>
        </>
      </BaseDemo>
    </div>
  );
}
