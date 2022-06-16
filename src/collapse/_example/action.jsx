import React, { useState } from 'react';
import { Collapse } from 'tdesign-mobile-react/collapse';

export default function () {
  const [val, setVal] = useState(0);
  console.log(val);
  return (
    <>
      <Collapse value={val} onChange={(val) => setVal(val)} expandIcon>
        <Collapse.Panel header="折叠面板标题" headerRightContent="收起">
          此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
        </Collapse.Panel>
      </Collapse>
    </>
  );
}
