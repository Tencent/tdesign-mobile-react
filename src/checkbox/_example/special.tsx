import React, { useState } from 'react';
import { Checkbox } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function () {
  const [defaultValue, setDefaultValue] = useState([0, 1]);
  const [defaultValue1, setDefaultValue1] = useState([0, 1]);
  return (
    <>
      <Checkbox.Group defaultValue={defaultValue} onChange={(e: number[]) => setDefaultValue(e)}>
        {Array.from(Array(3)).map((_, key) => (
          <div key={key} className={`card ${defaultValue.includes(key) ? 'card--active' : null}`}>
            {defaultValue.includes(key) && <Icon name="check" className="card__icon" aria-hidden />}
            <Checkbox
              value={key}
              label="多选"
              content="描述信息描述信息描述信息描述信息描述信息"
              icon={false}
              borderless
            ></Checkbox>
          </div>
        ))}
      </Checkbox.Group>

      <div className="tdesign-mobile-demo-block__summary" style={{ marginLeft: '16px', marginTop: '24px' }}>
        横向卡片多选框
      </div>

      <Checkbox.Group
        className="horizontal-box"
        defaultValue={defaultValue1}
        onChange={(e: number[]) => setDefaultValue1(e)}
      >
        {Array.from(Array(3)).map((_, key) => (
          <div key={key} className={`card ${defaultValue1.includes(key) ? 'card--active' : null}`}>
            {defaultValue1.includes(key) && <Icon name="check" className="card__icon" aria-hidden />}
            <Checkbox value={key} label="多选" content="" icon={false} borderless></Checkbox>
          </div>
        ))}
      </Checkbox.Group>
    </>
  );
}
