import React from 'react';
import { Progress } from 'tdesign-mobile-react';
import './style/index.less';

export default function Text() {
  return (
    <div className="tdesign-mobile-demo progress">
      <div class="progress-demo progress-demo--margin">
        <Progress percentage="88" />
      </div>
      <div class="progress-demo progress-demo--margin">
        <Progress percentage="88" label={false} />
      </div>
    </div>
  );
}
