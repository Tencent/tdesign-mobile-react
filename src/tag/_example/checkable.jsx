import React, { useState } from 'react';
import { TagCheck } from 'tdesign-mobile-react';

const CloseItems = [
  {
    name: '标签',
    size: 'middle',
    closable: true,
    defaultChecked: true,
  },
  {
    name: '标签',
    size: 'middle',
    closable: true,
    defaultChecked: true,
  },
  {
    name: '标签',
    size: 'middle',
    closable: true,
    defaultChecked: true,
  },
  {
    name: '标签',
    size: 'middle',
    closable: true,
    defaultChecked: true,
  },
  {
    name: '标签',
    size: 'middle',
    closable: true,
    defaultChecked: true,
  },
];
const ClickableUse = React.memo(() => {
  const [items, setItems] = useState(CloseItems);
  const [checked, setChecked] = useState(false);

  const handleClose = (dex) => {
    const temp = [...items];
    temp.splice(dex, 1);
    setItems(temp);
  };

  const handleOnChange = (v) => {
    console.log(v);
    setChecked(v);
  };
  return (
    <div className="t-tag__demo-common t-tag__demo-bg">
      <div className="t-tag__demo-block">
        <TagCheck size="large" defaultChecked onChange={handleOnChange}>
          标签
        </TagCheck>
        <TagCheck size="large" onChange={handleOnChange} checked={checked}>
          标签
        </TagCheck>
        <TagCheck size="large">标签</TagCheck>
        <TagCheck size="large">标签</TagCheck>
        <TagCheck size="large" disabled>
          标签
        </TagCheck>
      </div>
      <div className="t-tag__demo-block">
        <TagCheck size="middle" theme="primary" defaultChecked>
          标签
        </TagCheck>
        <TagCheck size="middle">标签</TagCheck>
        <TagCheck size="middle">标签</TagCheck>
        <TagCheck size="middle">标签</TagCheck>
        <TagCheck size="middle">标签</TagCheck>
        <TagCheck size="middle" disabled>
          标签
        </TagCheck>
      </div>
      <div className="t-tag__demo-block">
        {items.map((item, index) => {
          return (
            <TagCheck
              key={index}
              size="middle"
              defaultChecked={item.defaultChecked}
              closable={item.closable}
              checked={item.checked}
              onClick={() => {
                handleClose(index);
              }}
            >
              {item.name}
            </TagCheck>
          );
        })}
      </div>
    </div>
  );
});

export default ClickableUse;
