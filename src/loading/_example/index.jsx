import { useState, useCallback, useRef } from 'react';
import { Loading, Button, Switch } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';

export default function () {
  const [progress, setProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  let timer = useRef(null);

  const onPageLoading = useCallback(() => {
    if (timer.current) {
      return;
    }

    let progressValue = 0;
    setProgress(0);

    timer.current = setInterval(() => {
      if (progressValue >= 1) {
        setTimeout(() => {
          setProgress(0);
        }, 2000);

        clearInterval(timer.current);
        timer.current = null;
        return;
      }
      progressValue += 0.01;
      setProgress((pre) => pre + 0.01);
    }, 100);
  }, [progress, timer]);

  const clickSwitch = (value) => {
    console.log(value);
    setShowLoading(value);
  };

  return (
    <>
      <TDemoHeader
        title="Loading 加载中"
        summary="加载过程中只有图标显示。适用于打开页面或操作完成后模块内等待刷新的加载场景。"
      />
      <TDemoBlock title="01 类型" summary="纯图标">
        <div
          className="demo-content"
          style={{
            color: 'red',
            width: '130px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Loading />
          <Loading theme="spinner" />
          <div style={{ marginRight: '10px' }} />
          <Loading theme="dots" />
        </div>
      </TDemoBlock>
      <TDemoBlock summary="页面进度条加载">
        <div className="demo-content">
          <Loading theme="bar" progress={progress} />
          <Button variant="outline" onClick={onPageLoading}>
            {progress > 0 && progress <= 1 ? '页面加载中...' : '页面进度条加载'}
          </Button>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="图标加文字横向">
        <div className="demo-content">
          <Loading text="加载中..." />
          <div style={{ marginRight: '20px' }} />
          <Loading theme="spinner" text="加载中..." />
          <div style={{ marginRight: '20px' }} />
          <Loading>
            <span>加载中...</span>
          </Loading>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="图标加文字竖向">
        <div className="demo-content">
          <Loading text="加载中..." layout="vertical" />
        </div>
      </TDemoBlock>
      <TDemoBlock summary="纯文字">
        <div className="demo-content">
          <Loading indicator={false} text="加载中..." />
          <div style={{ marginRight: '20px' }} />
          <Loading theme="error" />
          <div style={{ marginRight: '20px' }} />
          <div>
            <Loading indicator={false}>
              <div class="custom-error">
                加载失败 <span>刷新</span>
              </div>
            </Loading>
          </div>
        </div>
      </TDemoBlock>
      <TDemoBlock summary="延迟加载">
        <div className="normal-content">
          <Switch label={['请求发起，延迟显示loading', '请求结束，隐藏loading']} onChange={clickSwitch} />
          <div>
            <Loading delay={1000} loading={showLoading} text="加载中..." />
          </div>
        </div>
      </TDemoBlock>

      <TDemoBlock title="02 规格" summary="图标加文字横向">
        <div className="normal-content" style={{ marginBottom: '30px' }}>
          <Loading size="large" text="加载中(大)..." />
          <div style={{ marginBottom: '10px' }} />
          <Loading size="medium" text="加载中(中)..." />
          <div style={{ marginBottom: '10px' }} />
          <Loading size="small" text="加载中(小)..." />
        </div>
      </TDemoBlock>
    </>
  );
}
