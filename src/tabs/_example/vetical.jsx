import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react/tabs';

import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style.less';

export default function () {
  return (
    <TDemoBlock title="03 特殊类型" summary="竖向选项卡">
      <ul className="hori-wrap">
        <li>
          <Tabs placement="left">
            <TabPanel value={'v1'} label="标签页一">
              <div className="veti-content">标签一内容</div>
            </TabPanel>
            <TabPanel value={'v2'} label="标签页二">
              <div className="veti-content">标签二内容</div>
            </TabPanel>
            <TabPanel value={'v3'} label="标签页三">
              <div className="veti-content">标签三内容</div>
            </TabPanel>
            <TabPanel value={'v4'} label="标签页四">
              <div className="veti-content">标签四内容</div>
            </TabPanel>
            <TabPanel value={'v5'} label="标签页五">
              <div className="veti-content">标签五内容</div>
            </TabPanel>
          </Tabs>
        </li>
      </ul>
    </TDemoBlock>
  );
}
