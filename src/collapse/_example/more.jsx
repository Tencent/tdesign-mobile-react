import React from 'react';
import { Collapse } from '../index';

export default function () {
  return (
    <>
      <Collapse defaultExpandAll>
        <Collapse.Panel header="面板标题1">
          <ul>
            <li>面板内容</li>
            <li>面板内容</li>
            <li>面板内容</li>
          </ul>
        </Collapse.Panel>
        <Collapse.Panel header="面板标题2">
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
