import React, { useState } from 'react';
import { HomeIcon, AppIcon, UserIcon } from 'tdesign-icons-react';
import { Segmented } from 'tdesign-mobile-react';
import './style/index.less';

export default function BlockSegmented() {
  const [valueWithIcon, setValueWithIcon] = useState<string | number>(0);

  const optionsWithIcon = [
    { value: 0, label: 'home', icon: <HomeIcon /> },
    { value: 1, label: 'categeray', icon: <AppIcon /> },
    { value: 2, label: 'mine', icon: <UserIcon /> },
  ];

  return (
    <div className="example-segmented">
      <Segmented
        block
        options={optionsWithIcon}
        value={valueWithIcon}
        onChange={(value, selectedOption) => {
          console.log('onChangeWithIcon:', value, selectedOption);
          setValueWithIcon(value);
        }}
      />
    </div>
  );
}
