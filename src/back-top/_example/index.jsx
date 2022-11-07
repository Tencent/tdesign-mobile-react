import React, { useState } from 'react';
import { Skeleton } from 'tdesign-mobile-react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style/index.less';
import RoundDemo from './round';
import HalfRoundDemo from './half-round';

export default function Base() {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const onClose = () => {
    setVisible(true);
    setVisible1(false);
  };

  const onClose1 = () => {
    setVisible(false);
    setVisible1(true);
  };

  const rowCols = [
    {
      height: '171px',
      borderRadius: '16px',
    },
    1,
    {
      width: '80%',
    },
    [
      {
        width: '60%',
      },
      {
        width: '20%',
      },
    ],
  ];

  return (
    <div className="tdesign-mobile-react-demo">
      <TDemoHeader
        title="BackTop 返回顶部"
        summary="当页面过长往下滑动是会出现返回顶部的便捷操作，帮助用户快速回到页面顶部"
      />
      <TDemoBlock title="01 类型" summary="圆型返回顶部">
        <RoundDemo visible={visible} onClose={onClose} />
      </TDemoBlock>
      <TDemoBlock summary="半圆型返回顶部">
        <HalfRoundDemo visible={visible1} onClose={onClose1} />
      </TDemoBlock>

      <div className="content">
        {Array.from(Array(4), (item, index) => (
          <div className="row" key={index}>
            {Array.from(Array(2), (v, key) => (
              <div className="item" key={key}>
                <Skeleton theme="text" rowCol={rowCols} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
