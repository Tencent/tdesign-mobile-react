import React from 'react';
import { Collapse } from 'tdesign-mobile-react/collapse';

export default function () {
  return (
    <>
      <Collapse expandMutex onChange={(value) => console.log('value change: ', value)}>
        <Collapse.Panel header="面板标题1">
          <ul className='t-collapse-demo-list'>
            <li>面板内容</li>
            <li>面板内容</li>
            <li>面板内容</li>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="面板标题2">
          <ul className='t-collapse-demo-list'>
            <li>面板内容</li>
            <li>面板内容</li>
            <li>面板内容</li>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="面板标题3">
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
