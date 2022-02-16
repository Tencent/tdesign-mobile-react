import React from 'react';
import { Button } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';
import TDemoHeader from '../../../docs/mobile/components/DemoHeader';
import './style/index.less';

import BaseButtonDemo from './base';
import IconButtonDemo from './icon';
import SizeButtonDemo from './size';
import ShapButtonDemo from './shape';

export default function Base() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Button 按钮" summary="按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。" />
      <TDemoBlock title="01 基础按钮" summary="基础类型分为主按钮、次按钮、文字按钮。">
        <div className="button-demo">
          <BaseButtonDemo />
        </div>

        <div style={{ background: '#a6a6a6', padding: '10px', marginBottom: '10px' }}>
          <Button variant="outline" ghost>
            幽灵按钮
          </Button>
        </div>

        <Button theme="primary" block>
          通栏按钮
        </Button>
      </TDemoBlock>

      <TDemoBlock title="02 图标按钮" summary="图标按钮分为图标加文字形式、纯图标形式">
        <div className="button-demo">
          <IconButtonDemo />
        </div>
      </TDemoBlock>

      <TDemoBlock title="03 按钮状态" summary="按钮禁用态">
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

      <TDemoBlock title="04 尺寸" summary="提供大、中、小 3 种不同大小按钮">
        <div className="button-demo">
          <SizeButtonDemo />
        </div>
      </TDemoBlock>

      <TDemoBlock title="05 形状">
        <div className="button-demo">
          <ShapButtonDemo />
        </div>
      </TDemoBlock>
    </div>
  );
}
