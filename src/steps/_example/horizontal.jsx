import React from "react";
import { Steps } from "tdesign-mobile-react";

export default function Horizontal() {

  return (
    <>
    <Steps current="1">
      <Steps.StepItem title="步骤描述" />
      <Steps.StepItem title="选中步骤" />
    </Steps>
    <Steps current="1">
      <Steps.StepItem title="步骤描述" content="辅助信息文字最多两行" />
      <Steps.StepItem title="选中步骤" content="辅助信息文字最多两行" />
    </Steps>
    <Steps current="0">
      <Steps.StepItem title="步骤描述" />
      <Steps.StepItem title="选中步骤" />
      <Steps.StepItem title="步骤描述" />
    </Steps>
    <Steps current="0">
      <Steps.StepItem title="步骤描述" content="辅助信息文字最多两行" />
      <Steps.StepItem title="选中步骤" content="辅助信息文字最多两行" />
      <Steps.StepItem title="步骤描述" content="辅助信息文字最多两行" />
    </Steps>
    </>
  );
}
