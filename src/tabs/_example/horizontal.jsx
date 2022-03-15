import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react/tabs';
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

  return (
    <TDemoBlock title="横向选项卡" summary="">
      <ul className="hori-wrap">
        <li>
          <Tabs>
            <TabPanel value={'v1'} label="标签1">
              <div>内容内容1111....</div>
            </TabPanel>
            <TabPanel value={'v2'} label="标签2222">
              <div>内容内容2222....</div>
            </TabPanel>
          </Tabs>
        </li>
        <li>
          <Tabs>
            <TabPanel value={'v1'} label="标签一">
              <div>内容内容1111....</div>
            </TabPanel>
            <TabPanel value={'v2'} label="标签二">
              <div>内容内容2222....</div>
            </TabPanel>
            <TabPanel value={'v3'} disabled label="tab禁用">
              <div>内容内容3333....</div>
            </TabPanel>
            <TabPanel value={'v4'} label="这个标签有点长">
              <div>内容内容4444....</div>
            </TabPanel>
          </Tabs>
        </li>
        <li>
          <Tabs defaultValue={'tab2'} list={list2}></Tabs>
        </li>
      </ul>
    </TDemoBlock>
  );
}
