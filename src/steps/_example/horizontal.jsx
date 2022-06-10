import React, { useState } from 'react';
import { Steps } from 'tdesign-mobile-react';

export default function Horizontal() {
  const [current] = useState(1);
  return (
    <>
      <Steps defaultCurrent={current} readonly={true}>
        <Steps.StepItem title="已完成步骤" />
        <Steps.StepItem title="当前步骤" />
        <Steps.StepItem title="未完成步骤" />
      </Steps>
      <Steps defaultCurrent={current} readonly={true}>
        <Steps.StepItem title="已完成步骤" content="辅助信息文字最多两行" />
        <Steps.StepItem title="当前步骤" content="辅助信息文字最多两行" />
        <Steps.StepItem title="未完成步骤" content="辅助信息文字最多两行" />
      </Steps>
      <Steps defaultCurrent={current} readonly={true}>
        <Steps.StepItem title="已完成步骤" content="辅助信息文字最多两行" />
        <Steps.StepItem title="错误步骤" content="辅助信息文字最多两行" status="error" />
        <Steps.StepItem title="未完成步骤" content="辅助信息文字最多两行" />
      </Steps>
    </>
  );
}
