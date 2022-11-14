import React from 'react';
import { Loading } from 'tdesign-mobile-react';

export default function () {
  return (
    <div
      className="demo-content"
      style={{
        color: 'red',
        width: '130px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Loading />
      <Loading theme="spinner" />
      <div style={{ marginRight: '10px' }} />
      <Loading theme="dots" />
    </div>
  );
}
