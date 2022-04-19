import React from 'react';
import { Button, Badge, Cell, CellGroup } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';

import './style/index.less';

export default function BadgeDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Badge 徽标" summary="展示新增内容的提示，用警示红色为主色，包含数字或文字提示内容" />

      <TDemoBlock title="01 类型" summary="徽标主要分红点、数字、文字和角标提醒">
        <div className="badge-demo">
          <div className="badge-item">
            <Badge dot>消息</Badge>
          </div>
          <div className="badge-item">
            <Badge count="16">消息</Badge>
          </div>
          <div className="badge-item">
            <Badge count="NEW">消息</Badge>
          </div>
          <div className="badge-item">
            <Badge count="···">消息</Badge>
          </div>
        </div>
        <div className="badge-demo">
          <div className="badge-item">
            <Badge dot>
              <Button size="small" variant="outline">
                小按钮
              </Button>
            </Badge>
          </div>
          <div className="badge-item">
            <Badge count="16">
              <Button size="small" variant="outline">
                小按钮
              </Button>
            </Badge>
          </div>

          <div className="badge-item">
            <Badge count="NEW">
              <Button size="small" variant="outline">
                小按钮
              </Button>
            </Badge>
          </div>
          <div className="badge-item">
            <Badge count="···">
              <Button size="small" variant="outline">
                小按钮
              </Button>
            </Badge>
          </div>
        </div>
        <CellGroup style={{ overflow: 'hidden' }}>
          <Cell title="单行标题" arrow note={<Badge dot />}></Cell>
          <Cell title="单行标题" arrow note={<Badge count={16} />}></Cell>
          <Cell
            title="单行标题"
            arrow
            note={
              <>
                <Badge count="NEW" shape="round" />
                <Badge count="NEW" style={{ marginLeft: '8px' }} />
              </>
            }
          ></Cell>
          <Cell title="单行标题" note={<Badge count="NEW" shape="ribbon" />}></Cell>
        </CellGroup>
      </TDemoBlock>
    </div>
  );
}
