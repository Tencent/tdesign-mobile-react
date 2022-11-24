import React from 'react';
import './style/index.less';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
import Right from './right';
import Disable from './disable';
import Group from './group';
import Max from './max';
import Icon from './icon';

export default function CheckboxDemo() {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Checkbox 多选框" summary="用于预设的一组选项中执行多项选择，并呈现选择结果。" />

      <TDemoBlock title="01 类型" summary="基础多选框">
        <div className="checkbox-demo">
          <Base />
        </div>
      </TDemoBlock>

      <TDemoBlock summary="右侧多选框">
        <div className="checkbox-demo">
          <Right />
        </div>
      </TDemoBlock>

      <TDemoBlock summary="带全选的多选框">
        <div className="checkbox-demo">
          <Group />
        </div>
      </TDemoBlock>

      <TDemoBlock summary="限制最多可选数量">
        <div className="checkbox-demo">
          <Max />
        </div>
      </TDemoBlock>

      <TDemoBlock title="02 状态" summary="多选框禁用态">
        <div className="checkbox-demo">
          <Disable />
        </div>
      </TDemoBlock>

      <TDemoBlock title="03 特殊类型" summary="自定义图标多选框">
        <div className="checkbox-demo">
          <Icon />
        </div>
      </TDemoBlock>
    </div>
  );
}
