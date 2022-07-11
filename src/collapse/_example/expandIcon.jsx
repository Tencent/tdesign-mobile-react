import React from 'react';
import { Collapse } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function () {
  const expandIcon = <Icon name="add-circle" size="1em" className="t-collapse-panel__header-icon" />;
  return (
    <>
      <Collapse expandIcon={expandIcon}>
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
