import React from 'react';
import { Tabs } from 'tdesign-mobile-react/tabs';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import './style.less';

export default function () {
  const list3 = [
    {
      label: '标签页一',
      value: 'tab1',
    },
    {
      label: '标签页二',
      value: 'tab2',
    },
    {
      label: '标签页三',
      value: 'tab3',
    },
    {
      label: '标签页四',
      value: 'tab4',
    },
  ];

  return (
    <TDemoBlock title="不显示激活线">
      <ul className="hori-wrap">
        <li>
          <Tabs list={list3} showBottomLine={false}></Tabs>
        </li>
      </ul>
    </TDemoBlock>
  );
}
