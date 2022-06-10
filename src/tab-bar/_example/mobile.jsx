import React, { useCallback, useState } from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';
import { AppIcon } from 'tdesign-icons-react';

import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

import './style/index.less';

const list1 = [
  {
    name: 'label_1',
    text: '标签一',
    children: [],
    badge: {},
  },
  {
    name: 'label_2',
    text: '标签二',
    children: [],
    badge: {},
  },
];
const list2 = [
  ...list1,
  {
    name: 'label_3',
    text: '标签三',
    children: [],
    badge: {},
  },
];
const list3 = [
  ...list2,
  {
    name: 'label_4',
    text: '标签四',
    children: [],
    badge: {},
  },
];
const list4 = [
  ...list3,
  {
    name: 'label_5',
    text: '标签五',
    children: [],
    badge: {},
  },
];

const list5 = [
  ...list1,
  {
    name: 'label_3',
    text: '此处展开',
    children: [
      {
        value: 'spread_1',
        label: '展开项一',
      },
      {
        value: 'spread_2',
        label: '展开项二',
      },
      {
        value: 'spread_3',
        label: '展开项三',
      },
    ],
  },
];

const list6 = [
  {
    name: 'label_1',
    text: '标签一',
    children: [],
    badge: {
      count: '16',
    },
  },
  {
    name: 'label_2',
    text: '标签二',
    children: [],
    badge: {
      dot: true,
    },
  },
  {
    name: 'label_3',
    text: '标签三',
    children: [],
    badge: {
      count: 'New',
    },
  },
  {
    name: 'label_4',
    text: '标签四',
    children: [],
    badge: {
      count: '···',
    },
  },
];

const demoList1 = [list1, list2, list3];
const demoList2 = [list1, list2, list3, list4, list6];
const demoList3 = [list1, list2, list3, list4];

const defaultValue = 'label_1';

function TabBarMobileDemo() {
  const [value, setValue] = useState(1);

  const change = useCallback((changeValue) => {
    setValue(changeValue);
    console.log('TabBar 值改变为：', changeValue);
  }, []);

  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="TabBar 标签栏" summary="移动端的主导航，用做功能模块之间的切换"></TDemoHeader>
      <TDemoBlock title="01 类型" summary="单层级纯文本标签栏">
        {demoList1.map((demo, index) => (
          <TabBar key={index} defaultValue={defaultValue} onChange={change}>
            {demo.map((item, idx) => (
              <TabBarItem name={item.name} key={item.name || idx} value={item.name}>
                {item.text}
              </TabBarItem>
            ))}
          </TabBar>
        ))}
      </TDemoBlock>
      <TDemoBlock summary="文本加图标标签栏">
        {demoList2.map((demo, index) => (
          <TabBar key={index} defaultValue={defaultValue} onChange={change}>
            {demo.map((item, idx) => (
              <TabBarItem
                name={item.name}
                key={item.name || idx}
                badgeProps={item.badge}
                icon={<AppIcon />}
                value={item.name}
              >
                {item.text}
              </TabBarItem>
            ))}
          </TabBar>
        ))}
      </TDemoBlock>
      <TDemoBlock summary="纯图标标签栏">
        {demoList3.map((demo, index) => (
          <TabBar key={index} defaultValue={defaultValue} onChange={change}>
            {demo.map((item, idx) => (
              <TabBarItem name={item.name} key={item.name || idx} icon={<AppIcon />} value={item.name}></TabBarItem>
            ))}
          </TabBar>
        ))}
      </TDemoBlock>
      <TDemoBlock summary="双层级纯文本标签栏">
        <TabBar value={value} onChange={change} fixed bordered={false}>
          {list5.map((item, idx) => (
            <TabBarItem name={item.name} key={item.name || idx} subTabBar={item.children}>
              {item.text}
            </TabBarItem>
          ))}
        </TabBar>
      </TDemoBlock>
    </div>
  );
}

export default TabBarMobileDemo;
