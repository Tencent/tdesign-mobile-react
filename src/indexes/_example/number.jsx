import React from 'react';
import { Icon } from 'tdesign-icons-react';
import { Message, Indexes } from 'tdesign-mobile-react';
import { number } from './data';
import './style/index.less';

export default function IndexesDemo({ goHome }) {
  let height = 0;
  try {
    height = window.innerHeight - document.querySelector('.tdesign-demo-topnav').clientHeight;
  } catch {
    //
  }
  return (
    <div style={{ position: 'relative' }}>
      <Icon
        name="arrow-left"
        className="return-indexes"
        onClick={() => {
          goHome();
        }}
      />
      <Indexes
        style={{ position: 'absolute', width: '100%' }}
        list={number}
        height={height}
        onSelect={({ groupIndex, childrenIndex }) => {
          Message.info({
            content: `您选择了${groupIndex}->${
              number.find((element) => element.index === groupIndex)?.children[childrenIndex]?.title
            }`,
          });
        }}
      />
    </div>
  );
}
