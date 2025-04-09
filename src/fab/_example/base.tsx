import React from 'react';
import { Icon } from 'tdesign-icons-react';
import { Fab } from 'tdesign-mobile-react';

export default function () {
  const onClick = (e) => {
    console.log('click Fab', e);
  };
  const yBounds = [30, 20];

  return (
    <>
      <Fab
        icon={<Icon name="add" size={24} />}
        draggable="all"
        style={{ right: '16px', bottom: '32px' }}
        onClick={onClick}
        yBounds={yBounds}
      />
    </>
  );
}
