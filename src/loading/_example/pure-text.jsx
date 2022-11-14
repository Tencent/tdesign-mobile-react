import React from 'react';
import { Loading } from 'tdesign-mobile-react';

export default function () {
  return (
    <div className="demo-content pure-text-demo-box">
      <Loading indicator={false} text="加载中..." />
      <Loading theme="error" />
      <div className="custom-error">
        <Loading indicator={false}>
          加载失败
          <span>刷新</span>
        </Loading>
      </div>
    </div>
  );
}
