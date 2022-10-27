import React, { useState, useEffect } from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';

function TabBarBaseDemo() {
  const list = [
    { name: 'label_1', text: '标签栏一' },
    { name: 'label_2', text: '标签栏二' },
    { name: 'label_3', text: '标签栏三' },
    { name: 'label_4', text: '标签栏四' },
  ];
  const [value, setValue] = useState('label_1');

  const change = (changeValue) => {
    setValue(changeValue);
    console.log('TabBar 值改变为：', changeValue);
  };

  useEffect(() => {
    console.log('当前值：', value);
  }, [value]);

  return (
    <div className="demo-tab-bar">
      <TabBar value={value} onChange={change}>
        {list.map((item, i) => (
          <TabBarItem key={item.name || i} value={item.name}>
            {item.text}
          </TabBarItem>
        ))}
      </TabBar>
    </div>
  );
}

export default TabBarBaseDemo;
