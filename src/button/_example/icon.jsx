import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function ({ disabled }) {
  return (
    <>
      <div className='flex align-center margin-right'>
        <Button size="large" icon={<Icon name="app" />} shape="rectangle" theme="primary" disabled={disabled}>图标按钮</Button>
        <Button size="large" icon={<Icon name="app" />} shape="round" theme="primary" disabled={disabled}>图标按钮</Button>
      </div>
      <div className='flex align-center margin-right'>
        <Button size="large" icon={<Icon name="app" />} shape="square" theme="primary" disabled={disabled}></Button>
        <Button size="large" icon={<Icon name="app" />} shape="circle" theme="primary" disabled={disabled}></Button>
      </div>
    </>
  );
}
