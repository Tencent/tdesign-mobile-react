import React, { useState } from 'react';
import { Tabs } from '../index';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style.less';

export default function () {
  const list2 = [
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
      disabled: true,
    },
    {
      label: '标签页四',
      value: 'tab4',
    },
  ];
  const content = {
    tab1: '标签一内容',
    tab2: '标签二内容',
    tab3: '标签三内容',
    tab4: '标签四内容',
    tab5: '标签五内容',
    tab6: '标签六内容',
  };
  const [key, setKey] = useState('tab1');
  const onChange = (value) => {
    setKey(value);
  };

  return (
    <div className='className="tdesign-mobile-demo"'>
      <TDemoBlock summary="底部选项卡">
        <ul className="hori-wrap">
          <li>
            <Tabs
              list={list2}
              placement="bottom"
              content={<div className="tab-content">{content[key]}</div>}
              change={onChange}
            ></Tabs>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
