import React, { useState, useEffect } from 'react';
import { TabBar, TabBarItem } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

function TabBarBaseDemo() {
  const list = [
    { value: 'label_1', icon: 'home', ariaLabel: '首页' },
    { value: 'label_2', icon: 'app', ariaLabel: '软件' },
    { value: 'label_3', icon: 'chat', ariaLabel: '聊天' },
    { value: 'label_4', icon: 'user', ariaLabel: '我的' },
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
    <div className="demo-tab-bar section-custom">
      <TabBar value={value} onChange={change}>
        {list.map((item, i) => (
          <TabBarItem key={item.value || i} icon={<Icon name={item.icon} />} value={item.value} />
        ))}
      </TabBar>
    </div>
  );
}

export default TabBarBaseDemo;
