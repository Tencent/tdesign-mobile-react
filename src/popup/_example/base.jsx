import React, { useState } from 'react';
import { Popup, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less'

export default function Base() {

  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visible4, setVisible4] = useState(false)
  const [visible5, setVisible5] = useState(false)

  const handleVisible1Change = (visible, e) => {
    setVisible1(visible);
  }
  const handleVisible2Change = (visible) => {
    setVisible2(visible);
  }

  const handleVisible3Change = (visible) => {
    setVisible3(visible);
  }

  const handleVisible4Change = (visible) => {
    setVisible4(visible);
  }
  
  const handleVisible5Change = (visible) => {
    setVisible5(visible);
  }

  return (
    <div className='tdesign-mobile-demo'>
      <TDemoHeader title="Popup 弹窗层" summary="由其他控件触发，屏幕滑出或弹出一块自定义内容区域"/>
      <TDemoBlock title="类型" summary="弹出层出现为止可能为顶部、底部、中部、左侧或右侧">
        <div>
          <div className='tdesign-mobile-demo__button-group'>
            <Button variant="outline" className='tdesign-mobile-demo__button' onClick={() => setVisible1(true)}>顶部弹出</Button>
            <Button variant="outline" className='tdesign-mobile-demo__button' onClick={() => setVisible2(true)}>底部弹出</Button>
            <Button variant="outline" className='tdesign-mobile-demo__button' onClick={() => setVisible3(true)}>中部弹出</Button>
            <Button variant="outline" className='tdesign-mobile-demo__button' onClick={() => setVisible4(true)}>左侧弹出</Button>
            <Button variant="outline" className='tdesign-mobile-demo__button' onClick={() => setVisible5(true)}>右侧弹出</Button>
          </div>
          <Popup visible={visible1} onVisibleChange={handleVisible1Change} placement="top">
            <div className="vertical"></div>
          </Popup>
          <Popup visible={visible2} onVisibleChange={handleVisible2Change} placement="bottom">
            <div className="vertical"></div>
          </Popup>
          <Popup visible={visible3} onVisibleChange={handleVisible3Change} placement="center">
            <div className="center"></div>
          </Popup>
          <Popup visible={visible4} onVisibleChange={handleVisible4Change} placement="left">
            <div className="horizontal"></div>
          </Popup>
          <Popup visible={visible5} onVisibleChange={handleVisible5Change} placement="right">
            <div className="horizontal"></div>
          </Popup>
        </div>
      </TDemoBlock>
    </div>
  );
}
