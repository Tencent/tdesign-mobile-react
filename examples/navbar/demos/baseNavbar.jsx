import React from 'react';
import { Navbar } from 'tdesign-mobile-react/navbar';

const divideLineStyle = {
  width: '100%',
  height: '24px',
  background: '#F9F9F9',
};

export default function BaseExample() {
  return (
    <div className="t-navbar-base-demo">
      <p style={divideLineStyle}></p>
      <Navbar
        rightShow={false}
        onClickRight={() => {
          alert(`click right`);
        }}
      >
        界面标题
      </Navbar>
    </div>
  );
}
