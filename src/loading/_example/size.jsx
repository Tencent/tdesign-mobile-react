import React from 'react';
import { Loading } from 'tdesign-mobile-react';

export default function () {
  return (
    <div className="demo-content demo-content--column demo-content-size">
      <Loading size="small" text="加载中(小)..." />
      <Loading size="medium" text="加载中(中)..." />
      <Loading size="large" text="加载中(大)..." />
    </div>
  );
}
