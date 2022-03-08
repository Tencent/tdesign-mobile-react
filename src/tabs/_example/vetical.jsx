import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react/tabs';

import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
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
    <TDemoBlock title="竖向选项卡" summary="top='left' | top = 'right">
      <ul className="veti-wrap">
        <li>
          <Tabs placement="left">
            <TabPanel value={'v1'} label="标签1">
              <div>
                <p className="common-text">内容内容11111</p>
                <p className="common-text">内容内容11111</p>
                <p className="common-text">内容内容11111</p>
              </div>
            </TabPanel>
            <TabPanel value={'v2'} disabled label="标签222">
              <div>
                <p className="common-text">内容内容2222</p>
                <p className="common-text">内容内容2222</p>
                <p className="common-text">内容内容2222</p>
              </div>
            </TabPanel>
            <TabPanel value={'v3'} label="标签3">
              <div>
                <p className="common-text">内容内容3333</p>
                <p className="common-text">内容内容3333</p>
                <p className="common-text">内容内容3333</p>
              </div>
            </TabPanel>
            <TabPanel value={'v4'} label="标签4">
              <div>
                <p className="common-text">内容内容4444</p>
                <p className="common-text">内容内容4444</p>
                <p className="common-text">内容内容4444</p>
              </div>
            </TabPanel>
          </Tabs>
        </li>
        <li>
          <Tabs list={list2} placement="right" content={<div>内容内容</div>}></Tabs>
        </li>
      </ul>
    </TDemoBlock>
  );
}
