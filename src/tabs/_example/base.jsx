import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react/tabs';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
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

  const list3 = [
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
    },
    {
      label: '标签页四',
      value: 'tab4',
    },
  ];

  const list4 = [
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
    },
    {
      label: '标签页四',
      value: 'tab4',
    },
    {
      label: '标签页五',
      value: 'tab5',
    },
    {
      label: '标签页六',
      value: 'tab6',
    },
  ];

  const onChange = (value) => {
    console.log('值', value);
  };

  return (
    <div className='className="tdesign-mobile-demo"'>
      <TDemoHeader
        title="Tabs 选项卡"
        summary="常用于某事物不同状态的展示切换，例如购物场景下的订单状态，“待付款”“待发货”等"
      />
      <TDemoBlock title="横向选项卡" summary="常用于某事物不同类型的展示切换，例如影视场景下的“电影”“电视剧”“综艺”等">
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
          <li>
            <Tabs defaultValue={'tab2'} list={list2}></Tabs>
          </li>
          <li>
            <p className="veti-wrap-p">元素过多可滚动</p>
            <Tabs list={list4} change={onChange}></Tabs>
          </li>
        </ul>
      </TDemoBlock>
      <TDemoBlock title="底部选项卡">
        <Tabs list={list2} placement="bottom" content={'内容内容'}></Tabs>
      </TDemoBlock>
      <TDemoBlock
        title="竖向选项卡"
        summary="常用于全量类目的展示切换，例如购物列表场景下的“服装“”家居“”珠宝“等，且内容区有可能为该类目下的二级分类"
      >
        <ul className="veti-wrap">
          <li>
            <p className="veti-wrap-p">左边</p>
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
            <p className="veti-wrap-p">右边</p>
            <Tabs list={list2} placement="right" content={<div>内容内容</div>}></Tabs>
          </li>
        </ul>
      </TDemoBlock>
      <TDemoBlock title="不同尺寸" summary="大 中 小">
        <ul className="hori-wrap">
          <li>
            <Tabs list={list3} size="large"></Tabs>
          </li>
          <li>
            <Tabs list={list3}></Tabs>
          </li>
          <li>
            <Tabs list={list3} size="small"></Tabs>
          </li>
        </ul>
      </TDemoBlock>
      <TDemoBlock title="不显示激活线">
        <ul className="hori-wrap">
          <li>
            <Tabs list={list3} showBottomLine={false}></Tabs>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
