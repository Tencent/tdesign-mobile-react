/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';
import { AppIcon } from 'tdesign-icons-react';

export default function PureIconDemo() {
  const [value, setValue] = useState(null);
  const list_1 = [
    {
      name: 'label_1',
    },
    {
      name: 'label_2',
    },
  ];
  const list_2 = [
    ...list_1,
    {
      name: 'label_3',
    },
  ];
  const list_3 = [
    ...list_2,
    {
      name: 'label_4',
    },
  ];
  const list_4 = [
    ...list_3,
    {
      name: 'label_5',
    },
  ];

  const demoList = [list_1, list_2, list_3, list_4];

  useEffect(
    (newValue) => {
      console.log('当前值：', newValue);
    },
    [value],
  );

  const change = (changeValue) => {
    setValue(changeValue);
    console.log('TabBar 值改变为：', changeValue);
  };

  return (
    <div className="demo-tab-bar">
      {demoList.map((list, index) => (
        <TabBar key={index} value={value} onChange={change} className="mt-12">
          {list.map((item, idx) => (
            <TabBarItem icon={<AppIcon />} key={item.name || idx} name={item.name || idx}></TabBarItem>
          ))}
        </TabBar>
      ))}
    </div>
  );
}
