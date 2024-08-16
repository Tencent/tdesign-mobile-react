import React from 'react';
import { Loading } from 'tdesign-mobile-react';

export default function PureTextLoading() {
  return (
    <>
      <Loading indicator={false} text="加载中..." />
    </>
  );
}
