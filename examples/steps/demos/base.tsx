import React from 'react';
import Steps from '../../../src/steps';

const { Step } = Steps;
export default function Base() {
  return (
    <>
      <Steps current={0}>
        <Step title="测试步骤1" description="node-description" />
        <Step title="测试步骤2" description="node-description" />
      </Steps>
    </>
  );
}
