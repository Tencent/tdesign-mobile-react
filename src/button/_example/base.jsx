import React from 'react';
import { Button } from 'tdesign-mobile-react';
import './style/base.less'
import TDemoButtonBlock from './components/TDemoButtonBlock'

export default function ({ disabled }) {
  return (
    <>
      <TDemoButtonBlock>
        <Button disabled={disabled} theme="primary" variant="text">
          文字按钮
        </Button>
      </TDemoButtonBlock>
      <TDemoButtonBlock>
        <Button disabled={disabled}>默认按钮</Button>
        <Button disabled={disabled} theme="primary">强按钮</Button>
        <Button disabled={disabled} theme="primary" variant="outline">
          弱按钮
        </Button>
        <Button disabled={disabled} variant="outline">次按钮</Button>
        <Button disabled={disabled} theme="danger">警告按钮</Button>
        <Button disabled={disabled} theme="danger" variant="outline">
          弱警告按钮
        </Button>
      </TDemoButtonBlock>
      <TDemoButtonBlock className='t-button-base__background-ghost'>
        <Button disabled={disabled} variant="outline" ghost>
          幽灵按钮
        </Button>
      </TDemoButtonBlock>
      <TDemoButtonBlock>
        <Button disabled={disabled} theme="primary" block>
          通栏按钮
        </Button>
      </TDemoButtonBlock>
      <TDemoButtonBlock className='t-button-base__group'>
        <Button disabled={disabled} block className='t-button__theme-white'>
          次按钮
        </Button>
        <Button disabled={disabled} theme="primary" block>
          主按钮
        </Button>
      </TDemoButtonBlock>
    </>
  );
}
