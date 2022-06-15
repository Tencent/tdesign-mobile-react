import React, { useState } from 'react';
import { Loading, Switch } from 'tdesign-mobile-react';

export default function () {
  const [showLoading, setShowLoading] = useState(false);

  const clickSwitch = (value) => {
    console.log(value);
    setShowLoading(value);
  };

  return (
    <>
      <Switch label={['请求发起，延迟显示loading', '请求结束，隐藏loading']} onChange={clickSwitch} />
      <div>
        <Loading delay={1000} loading={showLoading} text="加载中..." />
      </div>
    </>
  );
}
