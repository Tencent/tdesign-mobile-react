import React from 'react';
import { Tabs } from 'tdesign-mobile-react/tabs';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import './style.less';

export default function () {
  const list2 = [
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
      disabled: true,
    },
    {
      label: '标签页四',
      value: 'tab4',
    },
  ];

  return (
    <div className='className="tdesign-mobile-demo"'>
      <TDemoBlock title="底部选项卡">
        <Tabs list={list2} placement="bottom" content={'内容内容'}></Tabs>
      </TDemoBlock>
    </div>
  );
}
