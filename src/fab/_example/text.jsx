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
        icon={<Icon name="call" />}
        text="获取手机号"
        style={{ right: '16px', bottom: '32px' }}
        buttonProps={{ variant: 'outline' }}
        onClick={onClick}
      />
    </>
  );
}
