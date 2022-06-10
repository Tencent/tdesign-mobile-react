/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';

import { AppIcon } from 'tdesign-icons-react';

export default function TabBarIconTextDemo() {
  const [value, setValue] = useState(null);
  const list_1 = [
    {
      name: 'label_1',
      text: '标签一',
    },
    {
      name: 'label_2',
      text: '标签二',
    },
  ];
  const list_2 = [
    ...list_1,
    {
      name: 'label_3',
      text: '标签三',
    },
  ];
  const list_3 = [
    ...list_2,
    {
      name: 'label_4',
      text: '标签四',
    },
  ];
  const list_4 = [
    ...list_3,
    {
      name: 'label_5',
      text: '标签五',
    },
  ];

  const change = (changeValue) => {
    setValue(changeValue);
    console.log('TabBar 值改变为：', changeValue);
  };

  useEffect(() => {
    console.log('当前值：', value);
  }, [value]);

  const demoList = [list_1, list_2, list_3, list_4];

  return (
    <div className="demo-tab-bar">
      {demoList.map((list, idx) => (
        <TabBar key={idx} value={value} className="mt-12" onChange={change}>
          <TabBarItem name="label_0" icon={<AppIcon />}>
            hello world
          </TabBarItem>
          {list.map((item, i) => (
            <TabBarItem icon={<AppIcon />} key={item.name || i} name={item.name}>
              {item.text}
            </TabBarItem>
          ))}
        </TabBar>
      ))}
      <TabBar></TabBar>
    </div>
  );
}
