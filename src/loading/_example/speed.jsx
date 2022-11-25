import React, { useState } from 'react';
import { Loading, Slider } from 'tdesign-mobile-react';

export default function () {
  const [speed, setSpeed] = useState(300);

  return (
    <div className="demo-content demo-content--column">
      <Loading text="加载中..." duration={speed} />
      <div className="demo-loading-speed-slider">
        <span>速度调整</span>
        <Slider min={0} max={800} value={speed} onChange={setSpeed} />
      </div>
    </div>
  );
}
