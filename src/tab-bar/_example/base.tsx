import React, { useState, useEffect } from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

function TabBarBaseDemo() {
  const list = [
    { value: 'label_1', label: '首页', icon: 'home' },
    { value: 'label_2', label: '应用', icon: 'app' },
    { value: 'label_3', label: '聊天', icon: 'chat' },
    { value: 'label_4', label: '我的', icon: 'user' },
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
      <TabBar value={value} onChange={change} theme="tag" split={false}>
        {list.map((item, i) => (
          <TabBarItem key={item.value || i} icon={<Icon name={item.icon} />} value={item.value}>
            {item.label}
          </TabBarItem>
        ))}
      </TabBar>
    </div>
  );
}

export default TabBarBaseDemo;
