import React from 'react';
import { Sticky, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less'

export default function Base() {

  return (
    <div className='tdesign-mobile-demo'>
      <TDemoHeader title="Sticky 吸顶" summary="用于常驻页面顶部的信息，操作展示"/>
      <div className='tdesign-demo-block-wrap'>
        <TDemoBlock title="01 类型" summary="基础吸顶">
        <div className="tdesign-demo-block-1">
          <Sticky>
            <Button className='custom-common-button' theme='primary'>基础吸顶</Button>
          </Sticky>
        </div>
        </TDemoBlock>
        <TDemoBlock title="" summary="吸顶距离">
          <div className="tdesign-demo-block-2">
            <Sticky offsetTop={50}>
              <Button className='custom-common-button' theme='danger'>吸顶距离</Button>
            </Sticky>
          </div>
        </TDemoBlock>
        <TDemoBlock title="" summary="指定容器">
          <div className='tdesign-demo-block-3' id="container">
            <Sticky container="#container">
              <Button className='custom-button custom-common-button'>指定容器</Button>
            </Sticky>
          </div>
        </TDemoBlock>
      </div>
    </div>
  );
}
