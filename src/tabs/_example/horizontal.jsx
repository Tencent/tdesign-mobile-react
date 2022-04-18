import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react/tabs';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style.less';

export default function () {
  return (
    <TDemoBlock title="02 状态" summary="选项卡状态">
      <ul className="hori-wrap">
        <li>
          <Tabs>
            <TabPanel value={'v1'} label="标签页一">
              <div className="tab-content">标签一内容</div>
            </TabPanel>
            <TabPanel value={'v2'} label="标签页二">
              <div className="tab-content">标签二内容</div>
            </TabPanel>
            <TabPanel value={'v3'} disabled label="禁用状态">
              <div className="tab-content">标签三内容</div>
            </TabPanel>
          </Tabs>
        </li>
      </ul>
    </TDemoBlock>
  );
}
