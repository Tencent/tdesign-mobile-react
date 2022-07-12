import React, { useState } from 'react';
import { TagCheck } from 'tdesign-mobile-react';

const TagChecksOptions = [
  {
    name: '选中',
    checked: true,
  },
  {
    name: '未选中',
    checked: false,
  },
  {
    name: '不可选',
    checked: false,
    disabled: true,
  },
];

const CheckeableDemo = () => {
  const [tagChecks, setTagChecks] = useState(TagChecksOptions);

  const onClick = (tagCheckIndex) => {
    const shallowClone = [...tagChecks];
    shallowClone[tagCheckIndex].checked = !shallowClone[tagCheckIndex].checked;
    setTagChecks([...shallowClone]);
  };

  return (
    <>
      {tagChecks.map((item, index) => (
        <TagCheck key={index} checked={item.checked} disabled={item.disabled} onClick={() => onClick(index)}>
          {item.name}
        </TagCheck>
      ))}
    </>
  );
};

export default CheckeableDemo;
