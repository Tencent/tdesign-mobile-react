import React, { useState } from 'react';
import { Slider } from 'tdesign-mobile-react';
import './style/index.less'

export default function Base() {

  const [value, setValue] = useState([30, 70])
  const onChange = (value) => {
    setValue(value)
  }

  return (
    <div className='tdesign-mobile-demo'>
      <div className='tdesign-demo-block-wrap tdesign-demo-block-wrap__block'>
        <Slider value={value} range onChange={onChange}/>
      </div>
    </div>
  );
}
