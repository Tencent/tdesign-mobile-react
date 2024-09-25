import React, { useState } from 'react';
import { Steps, StepItem, Button } from 'tdesign-mobile-react';
import { CartIcon, ChevronRightIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Special() {
  const [options, setOptions] = useState({
    first: 3,
    second: 4,
  });

  const [count, setCount] = useState(4);

  const onFirstChange = (current: number) => {
    console.log('first change', current);
    setOptions({
      ...options,
      first: current,
    });
  };
  const onSecondChange = (current: number) => {
    console.log('second change', current);
    setOptions({
      ...options,
      second: current,
    });
  };

  const getTitle = (type: 'first' | 'second' | 'third', index: number) => {
    if (index === options[type]) {
      return '当前步骤';
    }
    if (index < options[type]) {
      return '已完成步骤';
    }
    if (index > options[type]) {
      return '未完成';
    }
  };

  return (
    <>
      <TDemoBlock summary="垂直自定义步骤条">
        <div className="tdesign-mobile-block">
          <Steps current={options.first} onChange={onFirstChange} layout="vertical" theme="dot">
            {Array.from({ length: count }).map((_, index) => (
              <StepItem
                key={index}
                title={getTitle('first', index)}
                index={index}
                content="辅助信息"
                titleRight={<ChevronRightIcon size={22} color="rgba(0, 0, 0, .4)" />}
              />
            ))}
          </Steps>
          <Button
            style={{ width: '100%' }}
            size="large"
            theme="light"
            onClick={() => {
              setOptions((pre) => ({ ...pre, first: pre.first + 1 }));
              setCount(count + 1);
            }}
          >
            下一步
          </Button>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="纯展示步骤条">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.second} onChange={onSecondChange} layout="vertical" theme="dot" readonly>
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem
                key={index}
                title="步骤展示"
                index={index}
                content="可自定义此处内容"
                icon={<CartIcon size={20} />}
              />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
    </>
  );
}
