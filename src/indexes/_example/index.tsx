import React, { useState } from 'react';
import { Button } from 'tdesign-mobile-react/button';
import { Message } from 'tdesign-mobile-react/message';
import { Icon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Indexes from '../Indexes';
import { letter, number } from './data';
import './style/index.less';

export default function IndexesDemo() {
  // 当前页面 0初始页面，1字母索引，2数字索引
  const [page, setPage] = useState(0);
  if (page === 0) {
    return (
      <div className="tdesign-mobile-demo">
        <TDemoHeader title="Indexes 索引" summary="用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容。" />

        <TDemoBlock title="01 类型" summary="基础索引类型">
          <p style={{ marginBottom: 20, padding: '0 16px' }}>
            <Button block onClick={() => setPage(1)}>
              字母索引
            </Button>
          </p>
          <p style={{ marginBottom: 20, padding: '0 16px' }}>
            <Button block onClick={() => setPage(2)}>
              数字索引
            </Button>
          </p>
        </TDemoBlock>
      </div>
    );
  }

  const list = {
    1: letter,
    2: number,
  }[page];

  return (
    <div style={{ position: 'relative' }}>
      <Icon name="arrow-left" className="return-indexes" onClick={() => setPage(0)} />
      <Indexes
        style={{ position: 'absolute', width: '100%' }}
        list={list}
        height={window.innerHeight - document.querySelector('.tdesign-demo-topnav').clientHeight}
        onSelect={({ groupIndex, childrenIndex }) => {
          Message.info({
            content: `您选择了${groupIndex}->${
              list.find((element) => element.index === groupIndex)?.children[childrenIndex]?.title
            }`,
          });
          console.log(
            `您选择了${groupIndex}->${
              list.find((element) => element.index === groupIndex)?.children[childrenIndex]?.title
            }`,
          );
        }}
      />
    </div>
  );
}
