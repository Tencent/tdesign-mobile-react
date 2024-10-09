import React from 'react';
import './style/dialog-body.less';

export default function DialogBody() {
  return (
    <div className="dialog-body">
      <p>用户引导的说明文案</p>
      <div className="img-wrapper">
        <img src="https://tdesign.gtimg.com/demo/demo-image-1.png" alt="demo" />
      </div>
    </div>
  );
}
