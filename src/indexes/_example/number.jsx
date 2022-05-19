import React from 'react';
import { Message } from 'tdesign-mobile-react/message';
import { Icon } from 'tdesign-icons-react';
import Indexes from '../Indexes';
import { number } from './data';
import './style/index.less';

export default function IndexesDemo({ goHome }) {
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
        height={window.innerHeight - document.querySelector('.tdesign-demo-topnav').clientHeight}
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
