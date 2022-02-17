import React from 'react';
import { Message } from 'tdesign-mobile-react';

export default function () {
  const onClick = () => {
    console.dir(Message);
    Message.info({
      content: 'xxxxxx',
    });
  };

  return (
    <>
      <div className="btn" onClick={onClick}>
        普通通知
      </div>
      <div className="btn" onClick={onClick}>
        警示提示通知
      </div>
      <div className="btn" onClick={onClick}>
        成功提示通知
      </div>
      <div className="btn" onClick={onClick}>
        错误提示通知
      </div>
    </>
  );
}
