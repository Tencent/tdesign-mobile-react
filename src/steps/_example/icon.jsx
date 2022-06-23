import React, { useState } from 'react';
import { Steps } from 'tdesign-mobile-react';
import { UserIcon, LocationIcon, TimeIcon } from 'tdesign-icons-react'

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
          icon={
            <>
              <UserIcon />
            </>
          }
        />
        <Steps.StepItem
          title="选中步骤"
          icon={
            <>
              <LocationIcon />
            </>
          }
        />
        <Steps.StepItem
          title="步骤描述"
          icon={
            <>
              <TimeIcon />
            </>
          }
        />
      </Steps>
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
            <>
              <UserIcon />
            </>
          }
        />
        <Steps.StepItem
          title="选中步骤"
          content="辅助信息文字最多两行"
          icon={
            <>
              <LocationIcon />
            </>
          }
        />
        <Steps.StepItem
          title="步骤描述"
          content="辅助信息文字最多两行"
          icon={
            <>
              <TimeIcon />
            </>
          }
        />
      </Steps>
    </>
  );
}
