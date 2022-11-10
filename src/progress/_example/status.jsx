import React, { useState } from 'react';
import { Progress, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import './style/index.less';

export default function Status() {
  const [percentage, setPercentage] = useState(88);

  const clickReduce = () => {
    setPercentage((percentage) => Math.max(0, percentage - 10));
  };

  const clickAdd = () => {
    setPercentage((percentage) => Math.min(100, percentage + 10));
  };

  return (
    <div className="tdesign-mobile-demo progress">
       <TDemoBlock summary="默认状态">
          <div className="progress-demo">
            <Progress percentage="88" />
          </div>
        </TDemoBlock>
        <TDemoBlock summary="错误状态">
          <div className="progress-demo">
            <Progress percentage="88" status="error" />
          </div>
        </TDemoBlock>
        <TDemoBlock summary="警告状态">
          <div className="progress-demo">
            <Progress percentage="88" status="warning" />
          </div>
        </TDemoBlock>
        <TDemoBlock summary="成功状态">
          <div className="progress-demo">
            <Progress percentage="88" status="success" />
          </div>
        </TDemoBlock>
        <TDemoBlock summary="过渡样式">
          <div className="progress-demo">
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
        </TDemoBlock>
    </div>
  );
}
