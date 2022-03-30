import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react/tabs';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style.less';

export default function () {
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
      </ul>
    </TDemoBlock>
  );
}
