import React, { useState, useEffect } from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';

function TabBarBaseDemo() {
  const list1 = [
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
  ];
  const list2 = [
    ...list1,
    {
      name: 'label_3',
      text: '标签三',
      icon: undefined,
    },
  ];
  const list3 = [
    ...list2,
    {
      name: 'label_4',
      text: '标签四',
      icon: undefined,
    },
  ];
  const [value, setValue] = useState('label_2');

  const change = (changeValue) => {
    setValue(changeValue);
    console.log('TabBar 值改变为：', changeValue);
  };

  useEffect(() => {
    console.log('当前值：', value);
  }, [value]);

  const demoList = [list1, list2, list3];

  return (
    <div className="demo-tab-bar">
      {demoList.map((demo, idx) => (
        <TabBar key={idx} value={value} onChange={change}>
          {demo.map((item, i) => (
            <TabBarItem key={item.name || i} icon={item.icon} value={item.name}>
              {item.text}
            </TabBarItem>
          ))}
        </TabBar>
      ))}
    </div>
  );
}

export default TabBarBaseDemo;
