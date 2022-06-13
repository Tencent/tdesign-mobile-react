import React, { useState } from 'react';
import { Steps } from 'tdesign-mobile-react';

export default function Click() {
  const [current1, setCurrent1] = useState(1);
  const [current2] = useState(1);
  const [current3] = useState(0);
  const stepItemList = [
    {
      title: '步骤描述',
      content: '辅助信息文字最多两行',
    },
    {
      title: '选中步骤',
      content: '辅助信息文字最多两行',
    },
  ];
  return (
    <>
      <Steps
        current={current1}
        onChange={(value) => {
          setCurrent1(value);
        }}
      >
        <Steps.StepItem title="步骤描述" />
        <Steps.StepItem title="选中步骤" />
      </Steps>
      <Steps defaultCurrent={current2} options={stepItemList} />
      <Steps defaultCurrent={current3}>
        <Steps.StepItem title="步骤描述" />
        <Steps.StepItem title="选中步骤" />
        <Steps.StepItem title="步骤描述" />
      </Steps>
      <Steps defaultCurrent={current3}>
        <Steps.StepItem title="步骤描述" content="辅助信息文字最多两行" />
        <Steps.StepItem title="选中步骤" content="辅助信息文字最多两行" />
        <Steps.StepItem title="步骤描述" content="辅助信息文字最多两行" />
      </Steps>
      <Steps defaultCurrent={current2}>
        <Steps.StepItem title="步骤描述" />
        <Steps.StepItem title="选中步骤" />
        <Steps.StepItem title="步骤描述" />
        <Steps.StepItem title="选中步骤" />
      </Steps>
      <Steps defaultCurrent={current2}>
        <Steps.StepItem title="步骤描述" content="辅助信息文字最多两行" />
        <Steps.StepItem title="选中步骤" content="辅助信息文字最多两行" />
        <Steps.StepItem title="步骤描述" content="辅助信息文字最多两行" />
        <Steps.StepItem title="选中步骤" content="辅助信息文字最多两行" />
      </Steps>
    </>
  );
}
