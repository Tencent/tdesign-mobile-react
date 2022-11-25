import React, { useState } from 'react';
import { Steps } from 'tdesign-mobile-react';

export default function Vertical() {
  const [current] = useState(1);
  // 竖向简化只读步骤条
  return (
    <Steps defaultCurrent={current} theme="dot" layout="vertical">
      <Steps.StepItem title="事件描述" />
      <Steps.StepItem title="事件描述" />
      <Steps.StepItem title="事件描述" />
    </Steps>
  );
}
