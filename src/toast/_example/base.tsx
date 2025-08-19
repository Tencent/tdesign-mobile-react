import React from 'react';
import { Toast, Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const onlyText = () => {
    Toast('轻提示文字内容');
  };

  const textMaxHeight = () => {
    Toast({
      message: '最多一行展示十个汉字宽度限制最多不超过三行文字行文字行文字',
    });
  };

  const iconHori = () => {
    Toast({ message: '轻提示文字内容', theme: 'success' });
  };

  const iconColumn = () => {
    Toast({ message: '轻提示文字内容', theme: 'success', direction: 'column' });
  };

  const iconLoading = () => {
    Toast({ message: '轻提示文字内容', theme: 'loading' });
  };

  return (
    <div className="toast-demo">
      <TDemoBlock summary="纯文本" padding>
        <Button block theme="primary" variant="outline" size="large" onClick={onlyText}>
          纯文本
        </Button>
      </TDemoBlock>

      <TDemoBlock summary="多行文字" padding>
        <Button block theme="primary" variant="outline" size="large" onClick={textMaxHeight}>
          多行文字
        </Button>
      </TDemoBlock>

      <TDemoBlock summary="带横向图标" padding>
        <Button block theme="primary" variant="outline" size="large" onClick={iconHori}>
          带横向图标
        </Button>
      </TDemoBlock>

      <TDemoBlock summary="带竖向图标" padding>
        <Button block theme="primary" variant="outline" size="large" onClick={iconColumn}>
          带竖向图标
        </Button>
      </TDemoBlock>

      <TDemoBlock summary="加载状态" padding>
        <Button block theme="primary" variant="outline" size="large" onClick={iconLoading}>
          加载状态
        </Button>
      </TDemoBlock>
    </div>
  );
}
