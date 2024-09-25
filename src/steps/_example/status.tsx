import React, { useState } from 'react';
import { Steps, StepItem } from 'tdesign-mobile-react';
import { CartIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Status() {
  const [options, setOptions] = useState({
    first: 1,
    second: 1,
    third: 1,
  });

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
  const onThirdChange = (current: number) => {
    console.log('third change', current);
    setOptions({
      ...options,
      third: current,
    });
  };

  const getTitle = (type: 'first' | 'second' | 'third', index: number) => {
    if (index === options[type]) {
      return '当前步骤';
    }
    if (index < options[type]) {
      return '已完成';
    }
    if (index > options[type]) {
      return '未完成';
    }
  };

  return (
    <>
      <TDemoBlock summary="选项卡状态">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.first} onChange={onFirstChange} currentStatus="error">
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem key={index} title={getTitle('first', index)} index={index} content="辅助信息" />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
      <TDemoBlock>
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.second} onChange={onSecondChange} currentStatus="error">
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem
                key={index}
                title={getTitle('second', index)}
                index={index}
                content="辅助信息"
                icon={<CartIcon size={20} />}
              />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
      <TDemoBlock>
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.third} theme="dot" onChange={onThirdChange} currentStatus="error">
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem key={index} title={getTitle('third', index)} index={index} content="辅助信息" />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
    </>
  );
}
