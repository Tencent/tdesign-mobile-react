import React from 'react';
import { Slider } from 'tdesign-mobile-react';
import './style/index.less'

const marks = { 
  0: '小', 
  50: '中', 
  100: '大'
};

export default function Base() {
  return (
    <div className='tdesign-mobile-demo'>
      <div className='tdesign-demo-block-wrap tdesign-demo-block-wrap__block'>
          <Slider marks={marks} defaultValue={50}/>
        </div>
    </div>
  );
}
