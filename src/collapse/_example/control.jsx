import React, { useState } from 'react';
import { Collapse } from 'tdesign-mobile-react/collapse';
import { Checkbox } from 'tdesign-mobile-react/checkbox';

export default function () {
  const [value, setValue] = useState([]);
  return (
    <>
      <Collapse value={value}>
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
      </Collapse>
      <br/>
      <Checkbox label="全部选中" onChange={(value) => setValue(value ? [0, 1] : [])} />
    </>
  );
}
