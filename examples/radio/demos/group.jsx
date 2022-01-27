import React, { useState } from 'react';
import { RadioGroup, Radio } from 'tdesign-mobile-react/radio';

export default function () {
  const itemOptions = ['北京', '上海', '广州', '深圳'];
  const [city, setCity] = useState('北京');
  const [city2, setCity2] = useState();
  return (
    <>
      <p>单选框组</p>
      <div>-------------------------------------</div>
      <RadioGroup value={city} options={itemOptions} onChange={setCity}></RadioGroup>
      <div>-------------------------------------</div>
      <RadioGroup value={city2} onChange={setCity2}>
        <Radio value="bj">北京</Radio>
        <Radio value="sh">上海</Radio>
        <Radio value="gz">广州</Radio>
        <Radio value="sz">深圳</Radio>
      </RadioGroup>
    </>
  );
}
