import React, { useState } from 'react';
import { Steps, StepItem, Image } from 'tdesign-mobile-react';
import { CartIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function Vertical() {
  const [options, setOptions] = useState({
    first: 1,
    second: 1,
    third: 1,
    four: 1,
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
  const onFourChange = (current: number) => {
    console.log('four change', current);
    setOptions({
      ...options,
      four: current,
    });
  };

  const getTitle = (type: 'first' | 'second' | 'third' | 'four', index: number) => {
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
      <TDemoBlock summary="垂直带序号步骤条">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.first} onChange={onFirstChange} layout="vertical">
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem key={index} title={getTitle('first', index)} index={index} content="可自定义此处内容" />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="垂直带图标步骤条">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.second} onChange={onSecondChange} layout="vertical">
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem
                key={index}
                title={getTitle('second', index)}
                index={index}
                content="可自定义此处内容"
                icon={<CartIcon size={20} />}
              />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="垂直简略步骤条">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.third} theme="dot" onChange={onThirdChange} layout="vertical">
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem key={index} title={getTitle('third', index)} index={index} content="可自定义此处内容" />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="垂直带可自定义此处内容步骤条">
        <div className="tdesign-mobile-block">
          <Steps defaultCurrent={options.four} theme="dot" onChange={onFourChange} layout="vertical">
            {Array.from({ length: 4 }).map((_, index) => (
              <StepItem
                key={index}
                title={getTitle('four', index)}
                index={index}
                content="可自定义此处内容"
                extra={
                  index === 1 && (
                    <Image
                      src="https://tdesign.gtimg.com/mobile/demos/steps1.png"
                      alt="图标"
                      style={{ width: '100%' }}
                    />
                  )
                }
              />
            ))}
          </Steps>
        </div>
      </TDemoBlock>
    </>
  );
}
