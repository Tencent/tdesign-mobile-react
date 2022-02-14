import React from 'react';
import { Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import './style/index.less';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Button 按钮" summary="按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。" />
      <TDemoBlock title="01 类型" summary="基础按钮">
        <div className="button-demo">
          <Button>默认按钮</Button>
          <Button theme="primary">强按钮</Button>
          <Button theme="primary" variant="outline">
            弱按钮
          </Button>
          <Button variant="outline">次按钮</Button>
          <Button theme="danger">警告按钮</Button>
          <Button theme="danger" variant="outline">
            弱警告按钮
          </Button>
          <Button theme="primary" variant="text">
            文字按钮
          </Button>
        </div>

        <div style={{ background: '#a6a6a6', padding: '10px', marginBottom: '10px' }}>
          <Button variant="outline" ghost>
            幽灵按钮
          </Button>
        </div>

        <Button theme="primary" block>
          通栏按钮
        </Button>
        <div className="button-demo"></div>

        <div className="button-demo"></div>
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="按钮禁用态">
        <div className="button-demo">
          <Button disabled>默认按钮</Button>
          <Button theme="primary" disabled>
            强按钮
          </Button>
          <Button theme="primary" variant="outline" disabled>
            弱按钮
          </Button>
          <Button variant="outline" disabled>
            次按钮
          </Button>
          <Button theme="danger" disabled>
            警告按钮
          </Button>
          <Button theme="danger" variant="outline" disabled>
            弱警告按钮
          </Button>
          <Button theme="primary" variant="text" disabled>
            文字按钮
          </Button>
        </div>

        <div style={{ background: '#a6a6a6', padding: '10px', marginBottom: '10px' }}>
          <Button variant="outline" ghost disabled>
            幽灵按钮
          </Button>
        </div>

        <Button theme="primary" block disabled>
          通栏按钮
        </Button>
      </TDemoBlock>

      <TDemoBlock title="03 规格" summary="文字按钮尺寸">
        <div className="button-demo">
          <Button theme="primary" size="large">
            按钮 44
          </Button>
          <Button theme="primary">按钮 40</Button>
          <br />
          <Button theme="primary" size="small">
            按钮 36
          </Button>
        </div>
      </TDemoBlock>
    </div>
  );
}
