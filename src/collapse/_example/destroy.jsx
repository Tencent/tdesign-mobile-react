import React from 'react';
import { Collapse } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Collapse>
        <Collapse.Panel header="收起不销毁面板内容" headerRightContent="展开" expandIcon>
          <ul>
            <li>面板内容</li>
            <li>面板内容</li>
            <li>面板内容</li>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="收起销毁面板内容" headerRightContent="展开" expandIcon destroyOnCollapse>
          <ul>
            <li>面板内容</li>
            <li>面板内容</li>
            <li>面板内容</li>
          </ul>
        </Collapse.Panel>
      </Collapse>
    </>
  );
}
