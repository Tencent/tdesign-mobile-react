import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function () {
  return (
    <>
      <div className='flex align-center margin-right'>
        <Button size="large" shape="rectangle" theme="primary">按钮 44</Button>
        <Button shape="rectangle" theme="primary">按钮 40</Button>
        <Button size="small" shape="rectangle" theme="primary">按钮 36</Button>
      </div>
      <div className='flex align-center margin-right'>
        <Button size="large" icon={<Icon name="app" />} shape="round" theme="primary">按钮</Button>
        <Button icon={<Icon name="app" />} shape="round" theme="primary">按钮</Button>
        <Button size="small" icon={<Icon name="app" />} shape="round" theme="primary">按钮</Button>
      </div>
      <div className='flex align-center margin-right'>
        <Button size="large" icon={<Icon name="app" />} shape="square" theme="primary"></Button>
        <Button icon={<Icon name="app" />} shape="square" theme="primary"></Button>
        <Button size="small" icon={<Icon name="app" />} shape="square" theme="primary"></Button>
      </div>
      <div className='flex align-center margin-right'>
        <Button size="large" icon={<Icon name="app" />} shape="circle" theme="primary"></Button>
        <Button icon={<Icon name="app" />} shape="circle" theme="primary"></Button>
        <Button size="small" icon={<Icon name="app" />} shape="circle" theme="primary"></Button>
      </div>
    </>
  );
}
