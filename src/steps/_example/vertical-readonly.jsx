import React, { useState } from 'react';
import { Steps } from 'tdesign-mobile-react';

export default function Vertical() {
  const [current] = useState(1);
  return (
    <>
      <Steps defaultCurrent={current} readonly={true} layout="vertical">
        <Steps.StepItem title="已完成步骤" />
        <Steps.StepItem title="当前步骤" />
        <Steps.StepItem title="未完成步骤" />
      </Steps>
      <Steps defaultCurrent={current} readonly={true} layout="vertical">
        <Steps.StepItem title="已完成步骤" />
        <Steps.StepItem title="错误步骤" status="error" />
        <Steps.StepItem title="未完成步骤" />
      </Steps>
    </>
  );
}
