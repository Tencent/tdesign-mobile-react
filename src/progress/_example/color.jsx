import React, { useState } from 'react';
import { Progress, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style/index.less';
import Type from './type';

export default function Color() {
  const [percentage, setPercentage] = useState(88);

  const clickReduce = () => {
    setPercentage((percentage) => Math.max(0, percentage - 10));
  };

  const clickAdd = () => {
    setPercentage((percentage) => Math.min(100, percentage + 10));
  };

  return (
    <div className="tdesign-mobile-demo progress">
      <div className="progress-demo progress-demo--margin">
        <Progress percentage="88" />
      </div>
      <div className="progress-demo progress-demo--margin">
        <Progress percentage="88" status="error" />
      </div>
      <div className="progress-demo progress-demo--margin">
        <Progress percentage="88" status="warning" />
      </div>
      <div className="progress-demo progress-demo--margin">
        <Progress percentage="100" />
      </div>
      <div className="progress-demo progress-demo--margin">
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
    </div>
  );
}
