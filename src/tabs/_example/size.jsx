import React from 'react';
import { Tabs, TabPanel } from '../index';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style.less';

export default function () {
  return (
    <TDemoBlock title="04 规格" summary="选中态文字尺寸规格">
      <ul className="hori-wrap">
        <li key="k1">
          <Tabs size="large">
            <TabPanel value={'v1'} label="大尺寸">
              <div className="tab-content">标签一内容</div>
            </TabPanel>
            <TabPanel value={'v2'} label="标签页二">
              <div className="tab-content">标签二内容</div>
            </TabPanel>
            <TabPanel value={'v3'} label="标签页三">
              <div className="tab-content">标签三内容</div>
            </TabPanel>
            <TabPanel value={'v4'} label="标签页四">
              <div className="tab-content">标签四内容</div>
            </TabPanel>
          </Tabs>
        </li>
        <li key="k2">
          <Tabs>
            <TabPanel value={'v1'} label="小尺寸">
              <div className="tab-content">标签一内容</div>
            </TabPanel>
            <TabPanel value={'v2'} label="标签页二">
              <div className="tab-content">标签二内容</div>
            </TabPanel>
            <TabPanel value={'v3'} label="标签页三">
              <div className="tab-content">标签三内容</div>
            </TabPanel>
            <TabPanel value={'v4'} label="标签页四">
              <div className="tab-content">标签四内容</div>
            </TabPanel>
          </Tabs>
        </li>
      </ul>
    </TDemoBlock>
  );
}
