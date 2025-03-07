import React, { useState } from 'react';
import { Guide, Button, Popup, Input, TdGuideProps } from 'tdesign-mobile-react';
import './style/index.less';

export default function Demo() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(-1);

  const steps: TdGuideProps['steps'] = [
    {
      element: '.no-mask .main-title',
      title: '用户引导标题',
      body: '用户引导的说明文案',
      placement: 'center',
    },
    {
      element: '.no-mask .label-field',
      title: '用户引导标题',
      body: '用户引导的说明文案',
      placement: 'bottom',
      highlightPadding: 0,
    },
    {
      element: '.no-mask .action',
      title: '用户引导标题',
      body: '用户引导的说明文案',
      placement: 'bottom-right',
    },
  ];

  const handleClick = () => {
    setVisible(true);
    setTimeout(() => {
      setCurrent(0);
    }, 800);
  };

  const handleChange: TdGuideProps['onChange'] = (current: number, { e, total }) => {
    console.log(current, e, total);
    setCurrent(current);
  };

  const handleNextStepClick: TdGuideProps['onNextStepClick'] = ({ e, next, current, total }) => {
    console.log(e, next, current, total);
  };

  const handleFinish: TdGuideProps['onFinish'] = ({ e, current, total }) => {
    setVisible(false);
    console.log(e, current, total);
  };

  const handleSkip: TdGuideProps['onSkip'] = ({ e, current, total }) => {
    setVisible(false);
    console.log(e, current, total);
  };
  const handleBack: TdGuideProps['onBack'] = ({ e, current, total }) => {
    console.log(e, current, total);
  };

  return (
    <div className="guide-demo">
      <Button theme="primary" content="用户引导" onClick={handleClick} />
      <Popup visible={visible} placement="bottom" style={{ height: '100vh', borderRadius: 0 }} destroy-on-close>
        <div className="guide-container no-mask">
          <div className="main-title">
            <div className="title-major">用户引导标题</div>
            <div className="title-sub">按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。</div>
          </div>
          <div className="field label-field">
            <Input label="标签文字" layout="vertical" placeholder="请输入内容" />
          </div>
          <div className="field">
            <Input label="标签文字" layout="vertical" placeholder="请输入内容" />
          </div>
          <div className="action">
            <Button theme="light" variant="base" size="large">
              重置
            </Button>
            <Button theme="primary" size="large">
              确定
            </Button>
          </div>
        </div>

        <Guide
          current={current}
          steps={steps}
          showOverlay={false}
          onChange={handleChange}
          onNextStepClick={handleNextStepClick}
          onFinish={handleFinish}
          onSkip={handleSkip}
          onBack={handleBack}
        ></Guide>
      </Popup>
    </div>
  );
}
