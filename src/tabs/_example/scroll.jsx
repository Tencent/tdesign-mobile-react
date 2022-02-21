import React from 'react';
import { Tabs } from 'tdesign-mobile-react/tabs';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import './style.less';

export default function () {
  const list4 = [
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
    {
      label: '标签页五',
      value: 'tab5',
    },
    {
      label: '标签页六',
      value: 'tab6',
    },
  ];

  const onChange = (value) => {
    console.log('值', value);
  };

  return (
    <TDemoBlock title="可滚动的选项卡" summary="元素过多时可滚动，点击可自动调整滚动位置">
      <Tabs list={list4} change={onChange}></Tabs>
    </TDemoBlock>
  );
}
