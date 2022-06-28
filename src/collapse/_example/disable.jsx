import React from 'react';
import { Collapse } from '../index';

export default function () {
  return (
    <>
      <Collapse defaultValue={[0]}>
        <Collapse.Panel header="面板标题" disabled>
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
