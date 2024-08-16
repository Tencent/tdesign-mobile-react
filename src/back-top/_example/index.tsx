import React, { useRef, useState } from 'react';
import { Skeleton } from 'tdesign-mobile-react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style/index.less';
import BaseDemo from './base';

export default function Base() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    setVisible(true);
  };

  const rowCols = [
    {
      width: '165.5px',
      height: '165.5px',
      borderRadius: '12px',
    },
    1,
    {
      width: '100px',
    },
  ];

  return (
    <div ref={containerRef} className="tdesign-mobile-react-demo">
      <TDemoHeader
        title="BackTop 返回顶部"
        summary="当页面过长往下滑动是会出现返回顶部的便捷操作，帮助用户快速回到页面顶部"
      />
      <TDemoBlock title="形状" summary="">
        <BaseDemo visible={visible} onClose={onClose} container={() => containerRef.current} />
      </TDemoBlock>

      <div className="group">
        {Array.from(Array(6), (_, key) => (
          <div className="item" key={key}>
            <Skeleton theme="text" rowCol={rowCols} />
          </div>
        ))}
      </div>
    </div>
  );
}
