import React, { useState } from 'react';
import { Steps } from 'tdesign-mobile-react';

export default function Icon() {
  const [current, setCurrent] = useState(1);
  return (
    <>
      <Steps
        current={current}
        onChange={(value) => {
          setCurrent(value);
        }}
      >
        <Steps.StepItem
          title="步骤描述"
          content="辅助信息文字最多两行"
          icon={
            <div className="tdesign-mobile-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="design-iconfont">
                <path
                  d="M12.25,1.5 C16.8063492,1.5 20.5,5.19365081 20.5,9.75 C20.5,12.7875661 17.75,17.0375661 12.25,22.5 C6.75,17.0375661 4,12.7875661 4,9.75 C4,5.19365081 7.69365081,1.5 12.25,1.5 Z M12.5,7 C10.8431458,7 9.5,8.34314575 9.5,10 C9.5,11.6568542 10.8431458,13 12.5,13 C14.1568542,13 15.5,11.6568542 15.5,10 C15.5,8.34314575 14.1568542,7 12.5,7 Z"
                  fill={current === 0 ? '#fff' : '#0052D9'}
                  fillRule="evenodd"
                />
              </svg>
            </div>
          }
        />
        <Steps.StepItem
          title="选中步骤"
          content="辅助信息文字最多两行"
          icon={
            <div className="tdesign-mobile-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="design-iconfont">
                <path
                  d="M12.25,1.5 C16.8063492,1.5 20.5,5.19365081 20.5,9.75 C20.5,12.7875661 17.75,17.0375661 12.25,22.5 C6.75,17.0375661 4,12.7875661 4,9.75 C4,5.19365081 7.69365081,1.5 12.25,1.5 Z M12.5,7 C10.8431458,7 9.5,8.34314575 9.5,10 C9.5,11.6568542 10.8431458,13 12.5,13 C14.1568542,13 15.5,11.6568542 15.5,10 C15.5,8.34314575 14.1568542,7 12.5,7 Z"
                  fill={current === 1 ? '#fff' : '#0052D9'}
                  fillRule="evenodd"
                />
              </svg>
            </div>
          }
        />
        <Steps.StepItem
          title="步骤描述"
          content="辅助信息文字最多两行"
          icon={
            <div className="tdesign-mobile-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="design-iconfont">
                <path
                  d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12.7692308,5.84615385 L11.2307692,5.84615385 L11.2307692,12.7692308 L15.9448889,16.7248468 L16.9337929,15.5463169 L12.7687692,12.0511538 L12.7692308,5.84615385 Z"
                  fill={current === 2 ? '#fff' : '#0052D9'}
                  fillRule="evenodd"
                />
              </svg>
            </div>
          }
        />
      </Steps>
    </>
  );
}
