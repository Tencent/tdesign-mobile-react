import React, { useState } from 'react';
import { Steps, StepItem } from 'tdesign-mobile-react';
import { CartIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Horizontal() {
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
      <TDemoBlock summary="水平带序号步骤条">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.first} onChange={onFirstChange}>
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem key={index} title={getTitle('first', index)} index={index} content="辅助信息" />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="水平带图标步骤条">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.second} onChange={onSecondChange}>
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
      <TDemoBlock summary="水平简略步骤条">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.third} theme="dot" onChange={onThirdChange}>
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem key={index} title={getTitle('third', index)} index={index} content="辅助信息" />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
    </>
  );
}
