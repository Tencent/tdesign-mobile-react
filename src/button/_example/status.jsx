import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';
import { useSetState } from 'ahooks';

export default function () {
  const [disabled] = useSetState(true);

  return (
    <>
      <div className="button-demo">
        <Button size="large" shape="rectangle" theme="primary" block disabled={disabled}>
          强按钮
        </Button>
        <Button size="large" theme="primary" shape="rectangle" variant="outline" block disabled={disabled}>
          弱按钮
        </Button>
        <Button size="large" variant="outline" shape="rectangle" block disabled={disabled}>
          次按钮
        </Button>
        <Button icon={<Icon name="app" />} shape="rectangle" theme="primary" block disabled={disabled}>
          带图标按钮
        </Button>
        <Button size="large" theme="danger" shape="rectangle" block disabled={disabled}>
          强警告按钮
        </Button>
        <Button size="large" theme="danger" shape="rectangle" variant="outline" block disabled={disabled}>
          弱警告按钮
        </Button>
      </div>

      <div style={{ background: '#a6a6a6', padding: '8px 16px', marginBottom: '16px' }}>
        <Button size="large" shape="rectangle" variant="outline" ghost block disabled={disabled}>
          幽灵按钮
        </Button>
      </div>
      <div className="margin-button">
        <Button size="large" shape="rectangle" theme="primary" variant="text" block disabled={disabled}>
          文字按钮
        </Button>
      </div>
      <div className="no-border-radius margin-button">
        <Button size="large" shape="rectangle" theme="primary" block disabled={disabled}>
          通栏按钮
        </Button>
      </div>
      <div className="no-border-radius no-border flex margin-button">
        <Button size="large" shape="rectangle" variant="outline" block disabled={disabled}>
          次按钮
        </Button>
        <Button size="large" shape="rectangle" theme="primary" block disabled={disabled}>
          主按钮
        </Button>
      </div>

      <div className="button-demo align-center margin-right">
        <div className="flex align-center margin-right">
          <Button size="large" icon={<Icon name="app" />} shape="rectangle" theme="primary" disabled={disabled}>
            图标按钮
          </Button>
          <Button size="large" icon={<Icon name="app" />} shape="round" theme="primary" disabled={disabled}>
            图标按钮
          </Button>
        </div>
        <div className="flex align-center margin-right">
          <Button size="large" icon={<Icon name="app" />} shape="square" theme="primary" disabled={disabled}></Button>
          <Button size="large" icon={<Icon name="app" />} shape="circle" theme="primary" disabled={disabled}></Button>
        </div>
      </div>

      <div className="flex align-center margin-right button-demo-loading">
        <div className="button-demo flex">
          <Button size="large" shape="square" theme="primary" loading disabled={disabled}></Button>
          <Button size="large" shape="rectangle" theme="primary" loading disabled={disabled}>
            加载中...
          </Button>
        </div>
      </div>
    </>
  );
}
