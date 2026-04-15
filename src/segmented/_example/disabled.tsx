import React, { useState } from 'react';
import { Segmented } from 'tdesign-mobile-react';
import './style/index.less';

export default function DisabledSegmented() {
  const [value, setValue] = useState<string | number>('最近');
  const [valueWithDisabled, setValueWithDisabled] = useState<string | number>(1);

  const optionsWithDisabled = [
    { value: 0, label: '周一' },
    { value: 1, label: '周二' },
    { value: 2, label: '周三', disabled: true },
    { value: 3, label: '周四' },
    { value: 4, label: '周五', disabled: true },
  ];

  return (
    <>
      <div className="example-segmented">
        <Segmented
          disabled
          options={['最近', '推荐', '热门']}
          value={value}
          onChange={(value, selectedOption) => {
            console.log('onChange:', value, selectedOption);
            setValue(value);
          }}
        />
      </div>

      <div className="example-segmented">
        <Segmented
          options={optionsWithDisabled}
          value={valueWithDisabled}
          onChange={(val, selectedOption) => {
            console.log('onChangeWithDisabled:', val, selectedOption);
            setValueWithDisabled(val);
          }}
        />
      </div>
    </>
  );
}
