import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

import BaseDemo from './base';
import YearMonthDemo from './year-month';
import TimeDemo from './time';
import MinuteDemo from './minute';
import DateSecondDemo from './date-second';
import WithTitleDemo from './with-title';

export default function DateTimePickerDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="DateTimePicker 时间选择器" summary="用于选择一个时间点或者一个时间段" />
      <TDemoBlock title="01 组件类型" padding={false} summary="年月日选择器">
        <BaseDemo />
      </TDemoBlock>
      <TDemoBlock summary="年月选择器">
        <YearMonthDemo />
      </TDemoBlock>
      <TDemoBlock summary="时分秒选择器">
        <TimeDemo />
      </TDemoBlock>
      <TDemoBlock summary="时分选择器">
        <MinuteDemo />
      </TDemoBlock>
      <TDemoBlock summary="年月日时分秒选择器">
        <DateSecondDemo />
      </TDemoBlock>
      <TDemoBlock title="02 组件样式" summary="是否带标题">
        <WithTitleDemo />
      </TDemoBlock>
    </div>
  );
}
