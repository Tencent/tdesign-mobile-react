import React from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';

function TabBarBaseDemo() {
  const list = [
    {
      name: 'label_1',
      text: '标签栏一',
    },
    {
      name: 'label_2',
      text: '标签栏二',
    },
    {
      name: 'label_3',
      text: '此处展开',
      children: [
        {
          value: 'spread_3',
          label: '展开项三',
        },
        {
          value: 'spread_2',
          label: '展开项二',
        },
        {
          value: 'spread_1',
          label: '展开项一',
        },
      ],
    },
  ];

  return (
    <div className="demo-tab-bar">
      <TabBar defaultValue="label_3">
        {list.map((item, i) => (
          <TabBarItem key={item.name || i} value={item.name} subTabBar={item.children}>
            {item.text}
          </TabBarItem>
        ))}
      </TabBar>
    </div>
  );
}

export default TabBarBaseDemo;
