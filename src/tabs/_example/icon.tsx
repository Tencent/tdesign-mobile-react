import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react';
import { IconFont } from 'tdesign-icons-react';

export default () => (
  <div>
    <Tabs defaultValue={'first'}>
      <TabPanel
        value={'first'}
        label={
          <div className="label-content">
            <IconFont name="app" size="large"></IconFont>
            <span>选项</span>
          </div>
        }
      ></TabPanel>
      <TabPanel
        value={'second'}
        label={
          <div className="label-content">
            <IconFont name="app" size="large"></IconFont>
            <span>选项</span>
          </div>
        }
      ></TabPanel>
      <TabPanel
        value={'third'}
        label={
          <div className="label-content">
            <IconFont name="app" size="large"></IconFont>
            <span>选项</span>
          </div>
        }
      ></TabPanel>
    </Tabs>
  </div>
);
