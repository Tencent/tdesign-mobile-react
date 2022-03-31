import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react/tabs';
import BaseDemo from './base';
import TimieoutDemo from './timeout';
import LoadingTextsDemo from './loading-texts';
import './style/index.less';

export default function Demo() {
  return (
    <Tabs>
      <TabPanel value={'1'} label="基础用法">
        <BaseDemo />
      </TabPanel>
      <TabPanel value={'2'} label="自定义文案">
        <LoadingTextsDemo />
      </TabPanel>
      <TabPanel value={'3'} label="超时事件">
        <TimieoutDemo />
      </TabPanel>
    </Tabs>
  );
}
