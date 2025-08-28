import React, { useState } from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react';
import { CheckIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const [defaultValue, setDefaultValue] = useState(0);
  const [defaultValueH, setDefaultValueH] = useState(0);
  return (
    <>
      <TDemoBlock summary="纵向卡片单选框">
        <RadioGroup value={defaultValue} onChange={(value: number) => setDefaultValue(value)}>
          {Array.from(Array(3), (_, key) => (
            <div className={`card ${defaultValue === key ? 'card--active' : ''}`} key={key}>
              {defaultValue === key && <CheckIcon color="#fff" className="card__icon" />}
              <Radio
                value={key}
                borderless
                label="单选"
                content="描述信息描述信息描述信息描述信息描述信息"
                icon="none"
              ></Radio>
            </div>
          ))}
        </RadioGroup>
      </TDemoBlock>
      <TDemoBlock summary="横向卡片单选框">
        <RadioGroup
          className="horizontal-box"
          value={defaultValueH}
          onChange={(value: number) => setDefaultValueH(value)}
        >
          {Array.from(Array(3), (_, key) => (
            <div className={`card ${defaultValueH === key ? 'card--active' : ''}`} key={key}>
              {defaultValueH === key && <CheckIcon color="#fff" className="card__icon" />}
              <Radio borderless value={key} label="单选" icon="none"></Radio>
            </div>
          ))}
        </RadioGroup>
      </TDemoBlock>
    </>
  );
}
