import React, { useState } from 'react';
import { Progress, Button } from 'tdesign-mobile-react';

import './style/index.less';

export default function TransitionDemo() {
  const [percentage, setPercentage] = useState(88);

  const clickReduce = () => {
    setPercentage((percentage) => Math.max(0, percentage - 10));
  };

  const clickAdd = () => {
    setPercentage((percentage) => Math.min(100, percentage + 10));
  };

  return (
    <div className="example-progress">
      <Progress percentage={percentage} />
      <div className="button-group">
        <Button theme="primary" variant="outline" size="small" onClick={clickReduce}>
          减少
        </Button>
        <div className="space"></div>
        <Button theme="primary" size="small" onClick={clickAdd}>
          增加
        </Button>
      </div>
    </div>
  );
}
