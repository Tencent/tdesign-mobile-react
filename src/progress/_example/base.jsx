import React from 'react';
import { Progress } from 'tdesign-mobile-react';

import './style/index.less';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo progress">
      <div className="progress-demo progress-demo--margin">
        <Progress percentage="0" />
      </div>
      <div className="progress-demo progress-demo--margin">
        <Progress percentage="88" />
      </div>
      <div className="progress-demo progress-demo--margin">
        <Progress percentage="100" />
      </div>
    </div>
  );
}
