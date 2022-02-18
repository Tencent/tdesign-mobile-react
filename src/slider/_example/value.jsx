import React, { useState } from 'react';
import { Slider } from 'tdesign-mobile-react';
import './style/index.less'

export default function Base() {

  const [value, setValue] = useState(65)
  const onChange = (value) => {
    setValue(value)
  }

  return (
    <div className='tdesign-mobile-demo'>
        <div className='tdesign-demo-block-wrap'>
          <Slider showValue value={value} onChange={onChange}/>
        </div>
    </div>
  );
}
