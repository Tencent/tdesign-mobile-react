/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';

export default function TextSpreadDemo() {
  const [value, setValue] = useState(null);
  const list = [
    {
      name: 'label_1',
      text: '标签一',
      icon: undefined,
    },
    {
      name: 'label_2',
      text: '标签二',
      icon: undefined,
    },
    {
      name: 'label_3',
      text: '此处展开',
      icon: undefined,
      children: [
        {
          name: 'spread_1',
          text: '展开项一',
          icon: undefined,
        },
        {
          name: 'spread_2',
          text: '展开项二',
          icon: undefined,
        },
        {
          name: 'spread_3',
          text: '展开项三',
          icon: undefined,
        },
      ],
    },
  ];

  useEffect(() => {
    console.log('当前值：', value);
  }, [value]);

  const change = (changeValue) => {
    setValue(changeValue);
    console.log('TabBar 值改变为：', changeValue);
  };

  return (
    <div className="demo-tab-bar">
      <TabBar value={value} onChange={change}>
        {list.map((item, index) => (
          <TabBarItem key={item.name || index} icon={item.icon} subTabBar={item.children} name={item.name}>
            {item.text}
          </TabBarItem>
        ))}
      </TabBar>
    </div>
  );
}
