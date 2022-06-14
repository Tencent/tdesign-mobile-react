import React from 'react';
import { Collapse } from 'tdesign-mobile-react/collapse';

export default function () {
  return (
    <>
      <Collapse>
        <Collapse.Panel header="收起不销毁面板内容" headerRightContent="展开" expandIcon>
          <ul className='t-collapse-demo-list'>
            <li>面板内容</li>
            <li>面板内容</li>
            <li>面板内容</li>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="收起销毁面板内容" headerRightContent="展开" expandIcon destroyOnCollapse>
          <ul className='t-collapse-demo-list'>
            <li>面板内容</li>
            <li>面板内容</li>
            <li>面板内容</li>
          </ul>
        </Collapse.Panel>
      </Collapse>
    </>
  );
}
