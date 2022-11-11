import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function () {
  return (
    <>
      <div className="button-demo">
        <Button size="large" shape="rectangle" theme="primary" block>
          强按钮
        </Button>
        <Button size="large" theme="primary" shape="rectangle" variant="outline" block>
          弱按钮
        </Button>
        <Button size="large" variant="outline" shape="rectangle" block>
          次按钮
        </Button>
        <Button icon={<Icon name="app" />} shape="rectangle" theme="primary" block>
          带图标按钮
        </Button>
        <Button size="large" theme="danger" shape="rectangle" block>
          强警告按钮
        </Button>
        <Button size="large" theme="danger" shape="rectangle" variant="outline" block>
          弱警告按钮
        </Button>
      </div>

      <div style={{ background: '#a6a6a6', padding: '8px 16px', marginBottom: '16px' }}>
        <Button size="large" shape="rectangle" variant="outline" ghost block>
          幽灵按钮
        </Button>
      </div>
      <div className="margin-button">
        <Button size="large" shape="rectangle" theme="primary" variant="text" block>
          文字按钮
        </Button>
      </div>
      <div className="no-border-radius margin-button">
        <Button size="large" shape="rectangle" theme="primary" block>
          通栏按钮
        </Button>
      </div>
      <div className="no-border-radius no-border flex margin-button">
        <Button size="large" shape="rectangle" variant="outline" block>
          次按钮
        </Button>
        <Button size="large" shape="rectangle" theme="primary" block>
          主按钮
        </Button>
      </div>

      <div className="button-demo align-center margin-right">
        <div className="flex align-center margin-right">
          <Button size="large" icon={<Icon name="app" />} shape="rectangle" theme="primary">
            图标按钮
          </Button>
          <Button size="large" icon={<Icon name="app" />} shape="round" theme="primary">
            图标按钮
          </Button>
        </div>
        <div className="flex align-center margin-right">
          <Button size="large" icon={<Icon name="app" />} shape="square" theme="primary"></Button>
          <Button size="large" icon={<Icon name="app" />} shape="circle" theme="primary"></Button>
        </div>
      </div>

      <div className="flex align-center margin-right button-demo-loading">
        <div className="button-demo flex">
          <Button size="large" shape="square" theme="primary" loading></Button>
          <Button size="large" shape="rectangle" theme="primary" loading>
            加载中...
          </Button>
        </div>
      </div>
    </>
  );
}
