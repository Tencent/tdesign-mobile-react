import React, { useState } from 'react';
import { Steps } from 'tdesign-mobile-react';

export default function Content() {
  const [current] = useState(1);
  return (
    <>
      <Steps defaultCurrent={current} readonly={true} layout="vertical">
        <Steps.StepItem
          title="已完成步骤"
          content={
            <div>
              可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。
              <img src="https://0729-75822.gzc.vod.tencent-cloud.com/site_doc/tdesign-logo.png" alt="" />
            </div>
          }
        />
        <Steps.StepItem
          title="当前步骤"
          content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"
        />
        <Steps.StepItem
          title="未完成步骤"
          content="可自定义此处内容，可自定义此处内容，可自定义此处内容可自定义此处内容可自定义此处内容。"
        />
      </Steps>
    </>
  );
}
