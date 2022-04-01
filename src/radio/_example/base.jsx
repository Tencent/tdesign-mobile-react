import React from 'react';
import { Icon } from 'tdesign-icons-react';
import { Radio } from 'tdesign-mobile-react/radio';

import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const ICON1 = <Icon className="t-icon" name="notification-filled" />;
  const ICON2 = <Icon className="t-icon" name="notification" />;
  return (
    <>
      <TDemoBlock title="基础使用" summary="单选框基础使用方法">
        <Radio></Radio>
        <Radio>单选</Radio>
        <Radio>
          单选多行显示单选多行显示单选多行显示单选多行显示单选多行显示单选多行显示单选多行显示单选多行显示单选多行显示单选多行显示单选多行显示
        </Radio>
        <Radio disabled>单选不可用</Radio>
        <Radio
          allowUncheck
          onChange={(checked) => {
            if (checked) return console.log('checked');
            return console.log('unchecked');
          }}
        >
          可取消选择
        </Radio>
        <Radio checked>直接被选中</Radio>
        <Radio content={<p style={{ color: 'red' }}>自定义内容</p>}></Radio>
        <Radio content={<p style={{ color: 'red' }}>内容区域不可点击</p>} contentDisabled></Radio>
        <Radio icon="stroke-line">stroke line</Radio>
        <Radio icon={[ICON1, ICON2]}>自定义图标</Radio>
        <Radio align="right">右侧选择</Radio>
      </TDemoBlock>
    </>
  );
}
