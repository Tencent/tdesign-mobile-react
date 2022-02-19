import React from 'react';
import { Message, Button } from 'tdesign-mobile-react';

export default function () {
  const onClick = () => {
    console.dir(Message);
    Message.info({
      content: 'xxxxxx',
    });
  };

  return (
    <div className="container">
      <Button variant="outline" className="button" onClick={onClick}>
        普通通知
      </Button>
      <Button variant="outline" className="button" onClick={onClick}>
        警示提示通知
      </Button>
      <Button variant="outline" className="button" onClick={onClick}>
        成功提示通知
      </Button>
      <Button variant="outline" className="button" onClick={onClick}>
        错误提示通知
      </Button>
    </div>
  );
}
