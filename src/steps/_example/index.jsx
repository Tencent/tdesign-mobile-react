import React, { useState } from "react";
import TDemoBlock from "../../../site/mobile/components/DemoBlock";
import TDemoHeader from "../../../site/mobile/components/DemoHeader";
import Horizontal from "./horizontal";
import "./style/index.less";

export default function StepsDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Steps 步骤条"
        summary="用于用户对某个任务的时间节点"
      />
      <TDemoBlock title="01 类型" summary="横向可操作步骤条">
        <div className="tdesign-mobile-block">
          <Horizontal />
        </div>
      </TDemoBlock>
    </div>
  );
}
