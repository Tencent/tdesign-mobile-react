import React from 'react';
import { Icon } from 'tdesign-icons-react';
import { Fab } from 'tdesign-mobile-react';

export default function () {
  const onClick = (e) => {
    console.log('click Fab', e);
  };
  return (
    <>
      <Fab
        icon={<Icon name="add" size={24} />}
        text="按钮文字"
        draggable="vertical"
        style={{ right: '16px', bottom: '32px' }}
        onClick={onClick}
      />
    </>
  );
}
