import React, { useState } from 'react';
import { Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import BaseDemo from './display';
import TextDemo from './text';

export default function FabDemo() {
  const [type, setType] = useState('base');

  const changeType = (type) => setType(type);
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader
        title="Fab 悬浮按钮"
        summary="当功能使用图标即可表示清楚时，可使用纯图标悬浮按钮，例如：添加、发布"
      />

      <TDemoBlock title="01 类型" summary="纯图标悬浮按钮">
        <ul className="fab-container">
          <li>
            <Button
              className="fab-btn"
              theme="primary"
              variant="outline"
              size="large"
              onClick={() => changeType('base')}
            >
              基础使用
            </Button>
          </li>
          <li>
            <Button
              className="fab-btn"
              theme="primary"
              variant="outline"
              size="large"
              onClick={() => changeType('advance')}
            >
              进阶使用
            </Button>
          </li>
        </ul>
      </TDemoBlock>
      {type === 'base' ? <BaseDemo /> : <TextDemo />}
    </div>
  );
}
