import React from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import BaseExample from './base';
import ScrollExample from './scroll';
import StripeExample from './stripe';
import BorderedExample from './bordered';
import CustomRowStyleExample from './custom-row-style';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Table 表格"
        summary=" 表格常用于展示同类结构下的多种数据，易于组织、对比和分析等，并可对数据进行搜索、筛选、排序等操作。一般包括表头、数据行和表尾三部分。 "
      />
      <TDemoBlock title="01 组件类型" summary="基础表格" padding={true}>
        <BaseExample />
      </TDemoBlock>

      <TDemoBlock summary="横向平铺可滚动表格" padding={true}>
        <ScrollExample />
      </TDemoBlock>

      <TDemoBlock summary="带斑马纹表格样式" padding={true}>
        <StripeExample />
      </TDemoBlock>

      <TDemoBlock summary="带边框表格样式" padding={true}>
        <BorderedExample />
      </TDemoBlock>

      <TDemoBlock summary="可自定义样式的表格" padding={true}>
        <CustomRowStyleExample />
      </TDemoBlock>
    </div>
  );
}
