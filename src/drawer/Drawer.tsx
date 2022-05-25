import React from 'react';
import { Popup } from 'tdesign-mobile-react';
import { TdDrawerProps } from './type';

const Drawer: React.FC<TdDrawerProps> = (props) => {
  const { visible } = props;
  console.log(props, 'props');

  const clickPop = (e: React.MouseEvent) => {
    console.log(e, 'e');
  };

  const visibleChange = (visible: boolean) => {
    console.log(visible, 'visibleChange');
    // if(!visible){
    //   const event:DrawerCloseContext = {
    //     trigger: 'esc',
    //     e: new React
    //   }
    //   onClose?.()
    // }
  };
  return (
    <Popup visible={visible} onVisibleChange={visibleChange} placement="left">
      <div onClick={clickPop} className="vertical">
        2333
      </div>
    </Popup>
    // <div onClick={clickPop}>
    // </div>
  );
};

export default Drawer;
