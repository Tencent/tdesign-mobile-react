import React from 'react';
import { Collapse } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Collapse value={1} expandIcon>
        <Collapse.Panel value={1} header="折叠面板标题">
          此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
        </Collapse.Panel>
      </Collapse>
    </>
  );
}
