import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react';
import './style.less';

export default function () {
  return (
    <ul className="hori-wrap">
      <li key="li1">
        <Tabs>
          <TabPanel value={'v1'} label="标签页一">
            <div className="tab-content">标签一内容</div>
          </TabPanel>
          <TabPanel value={'v2'} label="标签页二">
            <div className="tab-content">标签二内容</div>
          </TabPanel>
        </Tabs>
      </li>
      <li key="li2">
        <Tabs>
          <TabPanel value={'v1'} label="标签页一">
            <div className="tab-content">标签一内容</div>
          </TabPanel>
          <TabPanel value={'v2'} label="标签页二">
            <div className="tab-content">标签二内容</div>
          </TabPanel>
          <TabPanel value={'v3'} label="标签页三">
            <div className="tab-content">标签三内容</div>
          </TabPanel>
        </Tabs>
      </li>
      <li key="li3">
        <Tabs>
          <TabPanel value={'v1'} label="标签页一">
            <div className="tab-content">标签页一内容</div>
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
  );
}
