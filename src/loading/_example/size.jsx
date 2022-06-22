import React from 'react';
import { Loading } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Loading size="large" text="加载中(大)..." />
      <Loading size="medium" text="加载中(中)..." />
      <Loading size="small" text="加载中(小)..." />
    </>
  );
}
