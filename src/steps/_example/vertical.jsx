import React, { useState } from 'react';
import { Steps } from 'tdesign-mobile-react';

export default function Vertical(props) {
  const { type } = props;
  const [current] = useState(1);
  // 竖向只读步骤条
  if (type === 1) {
    return (
      <>
        <Steps defaultCurrent={current} readonly={true} layout="vertical">
          <Steps.StepItem title="已完成步骤" content="辅助信息文字最多两行" />
          <Steps.StepItem title="当前步骤" content="辅助信息文字最多两行" />
          <Steps.StepItem title="未完成步骤" content="辅助信息文字最多两行" />
        </Steps>
        <Steps defaultCurrent={current} readonly={true} layout="vertical">
          <Steps.StepItem title="已完成步骤" content="辅助信息文字最多两行" />
          <Steps.StepItem title="错误步骤" content="辅助信息文字最多两行" status="error" />
          <Steps.StepItem title="未完成步骤" content="辅助信息文字最多两行" />
        </Steps>
      </>
    );
  }
  // 竖向简化只读步骤条
  return (
    <Steps defaultCurrent={current} theme="dot" layout="vertical">
      <Steps.StepItem title="事件描述" />
      <Steps.StepItem title="事件描述" />
      <Steps.StepItem title="事件描述" />
    </Steps>
  );
}
