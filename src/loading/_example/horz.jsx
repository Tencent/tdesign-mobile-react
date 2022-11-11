import React from 'react';
import { Loading } from 'tdesign-mobile-react';

export default function () {
  return (
    <div className="demo-content">
      <Loading text="加载中..." />
      <div style={{ marginRight: '20px' }} />
      <Loading theme="spinner" text="加载中..." />
      <div style={{ marginRight: '20px' }} />
      <Loading>
        <span>加载中...</span>
      </Loading>
    </div>
  );
}
