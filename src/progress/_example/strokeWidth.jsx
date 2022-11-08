import React from 'react';
import { Progress } from 'tdesign-mobile-react';
import './style/index.less';

export default function StrokeWidth() {
  return (
    <div className="tdesign-mobile-demo progress">
      <div className="progress-demo progress-demo--margin">
        <Progress percentage="88" strokeWidth={20} />
      </div>
    </div>
  );
}
