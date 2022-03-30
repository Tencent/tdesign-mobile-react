import React from 'react';
import { LocationIcon } from 'tdesign-icons-react';
import { Button } from 'tdesign-mobile-react/button';
import { Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const iconColumn = () => {
    Toast({ icon: <LocationIcon />, direction: 'column' });
  };

  const iconHori = () => {
    Toast({ message: '地点', icon: <LocationIcon /> });
  };

  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="01 类型" summary="基础提示">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={iconHori}>
              带图标-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={iconColumn}>
              带图标-竖向
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
