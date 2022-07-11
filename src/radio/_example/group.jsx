import React, { useState } from 'react';
import { RadioGroup, Radio } from 'tdesign-mobile-react';

export default function () {
  const itemOptions = ['北京', '上海', '广州', '深圳'];
  const [city, setCity] = useState('北京');
  const [city2, setCity2] = useState('');
  const [city3, setCity3] = useState('');
  return (
    <>
      <RadioGroup value={city} options={itemOptions} onChange={(value) => setCity(`${value}`)}></RadioGroup>
      <div style={{ marginTop: 10 }}>
        <RadioGroup value={city2} onChange={(value) => setCity2(`${value}`)}>
          <Radio value="bj">北京</Radio>
          <Radio value="sh">上海</Radio>
          <Radio value="gz">广州</Radio>
          <Radio value="sz">深圳</Radio>
        </RadioGroup>
      </div>
      <div style={{ marginTop: 10 }}>
        <RadioGroup value={city2} onChange={(value) => setCity2(`${value}`)} disabled>
          <Radio value="bj">北京</Radio>
          <Radio value="sh">上海</Radio>
          <Radio value="gz">广州</Radio>
          <Radio value="sz">深圳</Radio>
        </RadioGroup>
      </div>
      <div style={{ marginTop: 10 }}>
        <RadioGroup value={city3} onChange={(value) => setCity3(`${value}`)}>
          <Radio value="bj">北京</Radio>
          <Radio value="sh" disabled>
            上海
          </Radio>
          <Radio value="gz">广州</Radio>
          <Radio value="sz">深圳</Radio>
        </RadioGroup>
      </div>
    </>
  );
}
