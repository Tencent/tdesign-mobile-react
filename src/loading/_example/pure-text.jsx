import React from 'react';
import { Loading } from 'tdesign-mobile-react';

export default function () {
  return (
    <>
      <Loading indicator={false} text="加载中..." />
      <Loading theme="error" />
      <div>
        <Loading indicator={false}>
          <div>
            加载失败 <span>刷新</span>
          </div>
        </Loading>
      </div>
    </>
  );
}
