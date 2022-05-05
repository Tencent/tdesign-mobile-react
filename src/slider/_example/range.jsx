import React from 'react';
import { Slider } from 'tdesign-mobile-react';
import './style/index.less'

export default function Base() {

  return (
    <div className='tdesign-mobile-demo'>
      <div className='tdesign-demo-block-wrap tdesign-demo-block-wrap__block'>
          <Slider showExtremeValue defaultValue={[30, 70]} range/>
        </div>
    </div>
  );
}
